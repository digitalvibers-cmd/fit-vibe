'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export async function generateMealPlan(durationInDays: number) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Not authenticated' }
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    const { data: goal } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

    if (!profile || !goal) {
        return { error: 'Profile incomplete' }
    }

    const prefs = profile.preferences || {}

    const prompt = `
    Create a personalized meal plan for ${durationInDays} days for:
    - Age: ${profile.age}
    - Gender: ${profile.gender}
    - Height: ${profile.height}cm
    - Current Weight: ${goal.current_weight}kg
    - Target Weight: ${goal.target_weight}kg
    - Goal: ${prefs.goal || 'General Fitness'}
    - Diet Preference: ${prefs.diet || 'None'}
    - Supplements taken: ${prefs.supplements?.join(', ') || 'None'}
    - Additional Notes: ${prefs.aiInput || 'None'}

    Vary the meals each day so it is not boring.
    
    Output ONLY standard JSON format (no markdown):
    {
      "durationInDays": ${durationInDays},
      "days": [
        {
          "day": 1,
          "total_calories": 2000,
          "macros": {"protein": "150g", "carbs": "200g", "fats": "65g"},
          "meals": [
            {"name": "Breakfast", "calories": 500, "items": ["Oats", "Whey", "Berries"]},
            {"name": "Lunch", "calories": 700, "items": ["Chicken breast", "Rice", "Broccoli"]}
          ]
        }
      ]
    }
  `

    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: "You are an expert nutritionist." }, { role: "user", content: prompt }],
            model: "gpt-4o-mini",
            response_format: { type: "json_object" },
        });

        const planContent = completion.choices[0].message.content
        if (!planContent) throw new Error("No content generated")

        const mealPlan = JSON.parse(planContent)

        await supabase.from('profiles').update({
            preferences: {
                ...prefs,
                latest_meal_plan: mealPlan,
                last_meal_generated: new Date().toISOString()
            }
        }).eq('id', user.id)

        revalidatePath('/meals')
        return { success: true, plan: mealPlan }

    } catch (error: any) {
        console.error('AI Error:', error)
        return { error: error.message || 'Failed to generate meal plan' }
    }
}
