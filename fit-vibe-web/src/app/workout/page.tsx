
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, PlayCircle, Timer, Activity, Dumbbell } from 'lucide-react'

import WeekCalendar from '@/components/common/WeekCalendar'
import { formatDate } from '@/utils/date-helpers'

export default async function WorkoutPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const searchParams = await props.searchParams
    const dateParam = typeof searchParams.date === 'string' ? searchParams.date : undefined
    const selectedDate = dateParam ? new Date(dateParam) : new Date()

    // Validate date
    const isValidDate = !isNaN(selectedDate.getTime())
    const dateToUse = isValidDate ? selectedDate : new Date()
    const dateString = formatDate(dateToUse)

    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return redirect('/login')
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    const latestPlan = profile?.preferences?.latest_plan?.workout || null

    return (
        <div className="min-h-screen bg-background pb-24">
            {/* Header */}
            <WeekCalendar dateString={dateString} />

            <main className="max-w-md mx-auto px-6 space-y-6">

                {latestPlan ? (
                    <>
                        {/* Workout Overview */}
                        <div className="bg-card rounded-3xl p-6 shadow-sm border">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h2 className="text-2xl font-bold mb-1">{latestPlan.title}</h2>
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1"><Timer className="w-4 h-4" /> {latestPlan.duration}</span>
                                        <span className="flex items-center gap-1"><Dumbbell className="w-4 h-4" /> {latestPlan.exercises.length} Exercises</span>
                                    </div>
                                </div>
                                <div className="bg-primary/10 p-3 rounded-full text-primary">
                                    <Activity className="w-6 h-6" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-secondary/50 p-3 rounded-xl">
                                    <span className="text-xs font-bold uppercase text-muted-foreground">Warmup</span>
                                    <p className="text-sm font-medium">{latestPlan.warmup}</p>
                                </div>
                                <div className="bg-blue-50 p-3 rounded-xl text-blue-700">
                                    <span className="text-xs font-bold uppercase opacity-70">Cooldown</span>
                                    <p className="text-sm font-medium">{latestPlan.cooldown}</p>
                                </div>
                            </div>

                            <Button className="w-full mt-6 rounded-full font-bold" size="lg">
                                Start Workout
                            </Button>
                        </div>

                        {/* Exercises List */}
                        <h3 className="text-lg font-bold">Exercises</h3>
                        <div className="space-y-3">
                            {latestPlan.exercises.map((exercise: any, index: number) => (
                                <Card key={index} className="border-none shadow-sm">
                                    <CardContent className="p-4 flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center font-bold text-gray-500 shrink-0">
                                            {index + 1}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold">{exercise.name}</h4>
                                            <p className="text-sm text-muted-foreground">
                                                {exercise.sets} Sets × {exercise.reps} Reps
                                            </p>
                                            {exercise.notes && (
                                                <p className="text-xs text-orange-600 mt-1">{exercise.notes}</p>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-12 text-muted-foreground">
                        <p>No workout plan generated.</p>
                        <Button className="mt-4" variant="secondary">Generate Plan</Button>
                    </div>
                )}
            </main>
        </div>
    )
}
