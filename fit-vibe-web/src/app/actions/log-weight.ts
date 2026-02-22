'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const weightSchema = z.object({
    weight: z.coerce.number().min(20, "Weight must be valid").max(500, "Weight must be valid"),
})

export async function logWeight(prevState: any, formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Not authenticated' }
    }

    const validatedFields = weightSchema.safeParse({
        weight: formData.get('weight')
    })

    if (!validatedFields.success) {
        return { error: 'Invalid weight' }
    }

    const { weight } = validatedFields.data

    try {
        const { error } = await supabase
            .from('weight_logs')
            .insert({
                user_id: user.id,
                weight: weight,
                date: new Date().toISOString().split('T')[0] // Current date YYYY-MM-DD
            })

        if (error) throw error

        revalidatePath('/goals')
        revalidatePath('/dashboard')

        return { success: true, message: 'Weight logged successfully' }

    } catch (error: any) {
        console.error('Weight Log Error:', error)
        return { error: 'Failed to log weight' }
    }
}
