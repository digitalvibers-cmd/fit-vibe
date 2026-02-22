'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { generateWorkoutPlan } from '../actions/generate-workout-plan'
import { generateMealPlan } from '../actions/generate-meal-plan'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

export default function GeneratePlanButton() {
    const [loading, setLoading] = useState(false)

    const handleGenerate = async () => {
        setLoading(true)
        try {
            const [workoutResult, mealResult] = await Promise.all([
                generateWorkoutPlan(7),
                generateMealPlan(7),
            ])
            if (workoutResult.error || mealResult.error) {
                toast.error(workoutResult.error || mealResult.error || 'Generation failed.')
            } else {
                toast.success('7-day plan generated!')
            }
        } catch (e) {
            toast.error('Something went wrong.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-white text-gray-900 hover:bg-gray-100 font-bold rounded-full"
        >
            {loading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Plan...
                </>
            ) : (
                'Generate Personalized Plan'
            )}
        </Button>
    )
}
