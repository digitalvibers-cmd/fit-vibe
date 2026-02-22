'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export async function generateWorkoutPlan(durationInDays: number) {
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
    Create a personalized workout plan for ${durationInDays} days for:
    - Age: ${profile.age}
    - Gender: ${profile.gender}
    - Height: ${profile.height}cm
    - Current Weight: ${goal.current_weight}kg
    - Target Weight: ${goal.target_weight}kg
    - Goal: ${prefs.goal || 'General Fitness'}
    - Experience: ${prefs.experience || 'Beginner'}
    - Injuries: ${prefs.injuries?.join(', ') || 'None'}
    - Commitment: ${prefs.commitment || 3} days/week
    - Training Location: ${prefs.trainingLocation || 'Gym'}
    - Available Equipment: ${prefs.trainingEquipment?.join(', ') || 'Standard Gym Equipment'}
    - Additional Notes: ${prefs.aiInput || 'None'}

    The plan must vary the workouts from day to day to keep the user motivated. 
    If they train at home, use only the available equipment provided, or bodyweight exercises.
    Leave rest days empty or specify active recovery.
    
    Output ONLY standard JSON format (no markdown):
    {
      "durationInDays": ${durationInDays},
      "workouts": [
        {
          "day": 1,
          "isRestDay": false,
          "title": "Upper Body Strength",
          "duration": "45 mins",
          "warmup": "5 mins...",
          "exercises": [
            {"name": "Exercise 1", "sets": "3", "reps": "12", "notes": "..."}
          ],
          "cooldown": "5 mins..."
        }
      ]
    }
  `

    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: "You are an expert fitness coach." }, { role: "user", content: prompt }],
            model: "gpt-4o-mini",
            response_format: { type: "json_object" },
        });

        const planContent = completion.choices[0].message.content
        if (!planContent) throw new Error("No content generated")

        const workoutPlan = JSON.parse(planContent)

        await supabase.from('profiles').update({
            preferences: {
                ...prefs,
                latest_workout_plan: workoutPlan,
                last_workout_generated: new Date().toISOString()
            }
        }).eq('id', user.id)

        revalidatePath('/workout')
        return { success: true, plan: workoutPlan }

    } catch (error: any) {
        console.error('AI Error:', error)
        return { error: error.message || 'Failed to generate workout plan' }
    }
}
