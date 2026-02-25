import { submitOnboarding } from './actions'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { generateWorkoutPlan } from '../actions/generate-workout-plan'
import { generateMealPlan } from '../actions/generate-meal-plan'

jest.mock('@/utils/supabase/server', () => ({
    createClient: jest.fn(),
}))

jest.mock('next/cache', () => ({
    revalidatePath: jest.fn(),
}))

jest.mock('next/navigation', () => ({
    redirect: jest.fn(),
}))

jest.mock('../actions/generate-workout-plan', () => ({
    generateWorkoutPlan: jest.fn(),
}))

jest.mock('../actions/generate-meal-plan', () => ({
    generateMealPlan: jest.fn(),
}))

describe('submitOnboarding', () => {
    let mockSupabase: any

    beforeEach(() => {
        jest.clearAllMocks()

        mockSupabase = {
            auth: {
                getUser: jest.fn().mockResolvedValue({ data: { user: { id: 'test-user-id' } } }),
            },
            from: jest.fn().mockReturnThis(),
            update: jest.fn().mockReturnThis(),
            insert: jest.fn().mockReturnThis(),
            eq: jest.fn().mockResolvedValue({ error: null }),
        }

            ; (createClient as jest.Mock).mockResolvedValue(mockSupabase)
    })

    const validData = {
        age: 30,
        gender: 'male' as const,
        height: 180,
        currentWeight: 80,
        targetWeight: 75,
        goal: 'Lose weight',
        experience: 'intermediate',
        injuries: ['none'],
        diet: 'classic',
        commitment: 4,
        trainingLocation: 'gym',
        trainingEquipment: [],
        supplements: ['whey'],
        sleep: 'good',
        aiInput: 'test input',
        activityLevel: 'moderate'
    }

    it('returns error if not authenticated', async () => {
        mockSupabase.auth.getUser.mockResolvedValueOnce({ data: { user: null } })

        const result = await submitOnboarding(validData)

        expect(result).toEqual({ error: 'Not authenticated' })
    })

    it('returns validation errors for invalid data', async () => {
        const invalidData = { ...validData, age: 5 } // Age below min

        const result = await submitOnboarding(invalidData as any)

        expect(result).toHaveProperty('error')
        expect((result as any).error).toHaveProperty('age')
    })

    it('successfully processes onboarding and triggers plan generation', async () => {

        // Setup mock inserts and updates to succeed
        mockSupabase.update.mockReturnValue({ eq: jest.fn().mockResolvedValue({ error: null }) })
        mockSupabase.insert.mockResolvedValue({ error: null })

            ; (generateWorkoutPlan as jest.Mock).mockResolvedValue({ success: true })
            ; (generateMealPlan as jest.Mock).mockResolvedValue({ success: true })

        await submitOnboarding(validData)

        // Verify profile update
        expect(mockSupabase.from).toHaveBeenCalledWith('profiles')
        expect(mockSupabase.update).toHaveBeenCalled()

        // Verify goal insert
        expect(mockSupabase.from).toHaveBeenCalledWith('goals')
        expect(mockSupabase.insert).toHaveBeenCalled()

        // Verify plan generation was triggered
        expect(generateWorkoutPlan).toHaveBeenCalledWith(7)
        expect(generateMealPlan).toHaveBeenCalledWith(7)

        // Verify revalidation and redirect
        expect(revalidatePath).toHaveBeenCalledWith('/dashboard')
        expect(redirect).toHaveBeenCalledWith('/dashboard')
    })

    it('continues to dashboard even if plan generation fails', async () => {

        // Setup mock inserts and updates to succeed
        mockSupabase.update.mockReturnValue({ eq: jest.fn().mockResolvedValue({ error: null }) })
        mockSupabase.insert.mockResolvedValue({ error: null })

            // Simulate failure in generation
            ; (generateWorkoutPlan as jest.Mock).mockRejectedValue(new Error('API failure'))
            ; (generateMealPlan as jest.Mock).mockResolvedValue({ success: true })

        await submitOnboarding(validData)

        // It should still have completed db operations
        expect(mockSupabase.insert).toHaveBeenCalled()

        // It should still redirect
        expect(revalidatePath).toHaveBeenCalledWith('/dashboard')
        expect(redirect).toHaveBeenCalledWith('/dashboard')
    })
})
