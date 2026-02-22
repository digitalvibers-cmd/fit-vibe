'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

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

    revalidatePath('/dashboard')
    redirect('/dashboard')
}
