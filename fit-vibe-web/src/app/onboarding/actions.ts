'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { generateWorkoutPlan } from '../actions/generate-workout-plan'
import { generateMealPlan } from '../actions/generate-meal-plan'

const onboardingSchema = z.object({
    age: z.coerce.number().min(10).max(100),
    gender: z.enum(['male', 'female', 'other']),
    height: z.coerce.number().min(50).max(300),
    currentWeight: z.coerce.number().min(20).max(500),
    targetWeight: z.coerce.number().min(20).max(500),
    goal: z.string().optional(),
    experience: z.string().optional(),
    injuries: z.array(z.string()).optional(),
    diet: z.string().optional(),
    commitment: z.coerce.number().min(1).max(7).optional(),
    planDuration: z.coerce.number().min(7).max(90).optional(),
    trainingLocation: z.string().optional(),
    trainingEquipment: z.array(z.string()).optional(),
    supplements: z.array(z.string()).optional(),
    sleep: z.string().optional(),
    aiInput: z.string().optional(),
    activityLevel: z.string().optional(),
})

export async function submitOnboarding(data: z.infer<typeof onboardingSchema>) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Not authenticated' }
    }

    const validatedFields = onboardingSchema.safeParse(data)

    if (!validatedFields.success) {
        console.error('Validation error:', validatedFields.error.flatten().fieldErrors)
        return { error: validatedFields.error.flatten().fieldErrors }
    }

    const validData = validatedFields.data

    // Update profile
    const { error: profileError } = await supabase
        .from('profiles')
        .update({
            age: validData.age,
            gender: validData.gender,
            height: validData.height,
            preferences: {
                goal: validData.goal,
                experience: validData.experience,
                injuries: validData.injuries,
                diet: validData.diet,
                commitment: validData.commitment,
                planDuration: validData.planDuration,
                trainingLocation: validData.trainingLocation,
                trainingEquipment: validData.trainingEquipment,
                supplements: validData.supplements,
                sleep: validData.sleep,
                aiInput: validData.aiInput, // This will be used by the AI Agent later
                activityLevel: validData.activityLevel
            }
        })
        .eq('id', user.id)

    if (profileError) {
        console.error('Profile update error:', profileError)
        return { error: 'Failed to update profile' }
    }

    // Insert goal
    const { error: goalError } = await supabase
        .from('goals')
        .insert({
            user_id: user.id,
            current_weight: validData.currentWeight,
            target_weight: validData.targetWeight,
            start_date: new Date().toISOString(),
        })

    if (goalError) {
        console.error('Goal insert error:', goalError)
        return { error: 'Failed to create goal' }
    }

    try {
        const pDuration = validData.planDuration || 7
        console.log(`Generating initial ${pDuration}-day plans...`)
        // Generate a dynamic initial plan for workouts and meals concurrently
        await Promise.all([
            generateWorkoutPlan(pDuration),
            generateMealPlan(pDuration)
        ])
    } catch (err) {
        console.error('Failed to generate initial plans:', err)
        // We log the error but do not block the onboarding logic to ensure user reaches dashboard
    }

    revalidatePath('/dashboard')
    return { success: true }
}
