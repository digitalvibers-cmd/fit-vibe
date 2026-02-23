'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const goalSchema = z.object({
    targetWeight: z.coerce.number().min(30, "Mora biti veće od 30kg").max(300, "Mora biti manje od 300kg"),
    targetDate: z.string().min(1, "Datum je obavezan")
})

export async function updateGoal(prevState: any, formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Niste prijavljeni' }
    }

    const rawData = {
        targetWeight: formData.get('targetWeight'),
        targetDate: formData.get('targetDate')
    }

    const validatedFields = goalSchema.safeParse(rawData)

    if (!validatedFields.success) {
        return { error: "Proverite unete podatke" }
    }

    const { targetWeight, targetDate } = validatedFields.data

    try {
        // Fetch current goal to see if it exists
        const { data: existingGoal } = await supabase
            .from('goals')
            .select('id')
            .eq('user_id', user.id)
            .single()

        if (existingGoal) {
            // Update
            const { error } = await supabase
                .from('goals')
                .update({
                    target_weight: targetWeight,
                    target_date: targetDate
                })
                .eq('id', existingGoal.id)

            if (error) throw error
        } else {
            // Get latest weight to set as current/starting weight if inserting new
            const { data: latestLog } = await supabase
                .from('weight_logs')
                .select('weight')
                .eq('user_id', user.id)
                .order('date', { ascending: false })
                .limit(1)

            const startWeight = latestLog && latestLog.length > 0 ? latestLog[0].weight : null

            // Insert
            const { error } = await supabase
                .from('goals')
                .insert({
                    user_id: user.id,
                    target_weight: targetWeight,
                    target_date: targetDate,
                    current_weight: startWeight,
                    start_date: new Date().toISOString().split('T')[0]
                })

            if (error) throw error
        }

        revalidatePath('/goals')
        revalidatePath('/dashboard')

        return { success: true, message: 'Cilj je uspešno sačuvan' }

    } catch (error: any) {
        console.error('Update Goal Error:', error)
        return { error: 'Došlo je do greške prilikom čuvanja cilja' }
    }
}
