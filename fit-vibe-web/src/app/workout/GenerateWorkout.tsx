'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2, Sparkles } from 'lucide-react'
import { generateWorkoutPlan } from '../actions/generate-workout-plan'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export default function GenerateWorkout() {
    const [isGenerating, setIsGenerating] = useState(false)
    const [duration, setDuration] = useState<number>(7)

    const handleGenerate = async () => {
        setIsGenerating(true)
        try {
            const res = await generateWorkoutPlan(duration)
            if (res?.error) {
                toast.error(res.error)
            } else {
                toast.success('Workout plan generated successfully!')
            }
        } catch (error) {
            toast.error('Failed to generate plan.')
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <div className="text-center py-12 text-muted-foreground space-y-8 bg-card rounded-3xl border shadow-sm px-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                <Sparkles className="w-8 h-8" />
            </div>

            <div>
                <h3 className="text-xl font-bold text-foreground mb-2">No Active Plan</h3>
                <p className="text-sm">Let our AI build a personalized routine based on your goals, location, and available equipment.</p>
            </div>

            <div className="space-y-3 bg-secondary/30 p-4 rounded-2xl">
                <p className="text-sm font-semibold text-foreground">Select Plan Duration</p>
                <div className="flex justify-center gap-2">
                    {[7, 14, 21, 30].map(days => (
                        <button
                            key={days}
                            onClick={() => setDuration(days)}
                            className={cn(
                                "px-3 py-2 rounded-xl text-sm font-bold border-2 transition-all flex-1",
                                duration === days
                                    ? "border-primary bg-primary/10 text-primary"
                                    : "border-border hover:border-primary/50 bg-background text-foreground"
                            )}
                        >
                            {days}d
                        </button>
                    ))}
                </div>
            </div>

            <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full rounded-full font-bold h-12 text-md shadow-lg transition-all"
                size="lg"
            >
                {isGenerating ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Crafting your plan...</> : 'Generate AI Plan'}
            </Button>
        </div>
    )
}
