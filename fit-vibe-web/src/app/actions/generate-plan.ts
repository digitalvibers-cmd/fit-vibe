'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export async function generatePlan() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Not authenticated' }
    }

    // Fetch full profile
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
    Create a personalized daily workout and meal plan for:
    - Age: ${profile.age}
    - Gender: ${profile.gender}
    - Height: ${profile.height}cm
    - Current Weight: ${goal.current_weight}kg
    - Target Weight: ${goal.target_weight}kg
    - Goal: ${prefs.goal || 'General Fitness'}
    - Experience: ${prefs.experience || 'Beginner'}
    - Injuries: ${prefs.injuries?.join(', ') || 'None'}
    - Diet: ${prefs.diet || 'None'}
    - Commitment: ${prefs.commitment || 3} days/week
    - Equipment/Notes: ${prefs.aiInput || 'None'}

    Output ONLY standard JSON format (do not use markdown code blocks):
    {
      "workout": {
        "title": "Workout Title",
        "duration": "45 mins",
        "warmup": "5 mins...",
        "exercises": [
          {"name": "Exercise 1", "sets": "3", "reps": "12", "notes": "..."}
        ],
        "cooldown": "5 mins..."
      },
      "meal": {
        "total_calories": 2000,
        "macros": {"protein": "150g", "carbs": "200g", "fats": "65g"},
        "meals": [
          {"name": "Breakfast", "calories": 500, "items": ["Oats", "Whey..."]}
        ]
      }
    }
  `

    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: "You are an expert fitness coach." }, { role: "user", content: prompt }],
            model: "gpt-4o-mini", // Using mini for speed/cost, can upgrade
            response_format: { type: "json_object" },
        });

        const planContent = completion.choices[0].message.content
        if (!planContent) throw new Error("No content generated")

        const plan = JSON.parse(planContent)

        // Save to DB (We need a table for generated plans, or just store in a JSON column for now)
        // For MVP, let's store in a new 'daily_plans' table or just return it to UI
        // Let's create a table 'plans'

        // Check if table exists? We might need a migration. 
        // For now, let's return it to the UI to display, and maybe save to a 'generated_plan' column in profiles or goals?
        // Better: Save to 'workout_plans' and 'meal_plans' tables as per original plan.
        // But those tables don't exist yet!
        // I will save it to 'preferences.latest_plan' for immediate MVP simplicity without new migration in this step.

        await supabase.from('profiles').update({
            preferences: {
                ...prefs,
                latest_plan: plan,
                last_generated: new Date().toISOString()
            }
        }).eq('id', user.id)

        revalidatePath('/dashboard')
        return { success: true, plan }

    } catch (error: any) {
        console.error('AI Error:', error)
        return { error: error.message || 'Failed to generate plan' }
    }
}
