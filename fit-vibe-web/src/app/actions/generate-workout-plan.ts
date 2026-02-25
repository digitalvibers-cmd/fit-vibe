'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { GoogleGenAI } from '@google/genai'
import { FITNESS_KNOWLEDGE } from '@/knowledge-base'

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
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
    
    CRITICAL INSTRUCTION: The entire output MUST be written in Serbian language (Srpski jezik). Translate all titles, exercise names, instructions, warmups, and cooldowns to Serbian. Do not use English words.

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
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction: "You are an expert fitness coach. Use the provided fitness knowledge base to ground your workout recommendations. If the knowledge base mentions specific exercises, resistance band logic, or tips, apply them strictly to the generated workout plan. IMPORTANT: ALL OUTPUT MUST BE IN SERBIAN LANGUAGE (SRPSKI JEZIK).\n\n### FITNESS KNOWLEDGE BASE\n" + FITNESS_KNOWLEDGE,
                responseMimeType: "application/json",
            }
        });

        const planContent = response.text;
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
