'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const profileSchema = z.object({
    display_name: z.string().min(2, "Name must be at least 2 characters"),
    age: z.coerce.number().min(1, "Age must be valid"),
    height: z.coerce.number().min(50, "Height must be valid"),
    gender: z.string().nonempty("Gender is required"),
    goal: z.string().optional(),
    activityLevel: z.string().optional(),
})

export async function updateProfile(prevState: any, formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Not authenticated' }
    }

    const rawData = {
        display_name: formData.get('display_name'),
        age: formData.get('age'),
        height: formData.get('height'),
        gender: formData.get('gender'),
        goal: formData.get('goal'),
        activityLevel: formData.get('activityLevel'),
    }

    const validatedFields = profileSchema.safeParse(rawData)

    if (!validatedFields.success) {
        return { error: validatedFields.error.format() }
    }

    const { display_name, age, height, gender, goal, activityLevel } = validatedFields.data

    // Fetch current preferences to merge
    const { data: currentProfile } = await supabase
        .from('profiles')
        .select('preferences')
        .eq('id', user.id)
        .single()

    const currentPrefs = currentProfile?.preferences || {}

    const updatedPreferences = {
        ...currentPrefs,
        goal,
        activityLevel
    }

    try {
        const { error } = await supabase
            .from('profiles')
            .update({
                display_name,
                age,
                height,
                gender,
                preferences: updatedPreferences,
                updated_at: new Date().toISOString()
            })
            .eq('id', user.id)

        if (error) throw error

        revalidatePath('/profile')
        revalidatePath('/dashboard')

        return { success: true, message: 'Profile updated successfully' }

    } catch (error: any) {
        console.error('Profile Update Error:', error)
        return { error: 'Failed to update profile' }
    }
}
