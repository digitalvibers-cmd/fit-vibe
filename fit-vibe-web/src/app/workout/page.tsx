
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, PlayCircle, Timer, Activity, Dumbbell } from 'lucide-react'

import WeekCalendar from '@/components/common/WeekCalendar'
import { formatDate } from '@/utils/date-helpers'
import GenerateWorkout from './GenerateWorkout'
import RegenerateWorkoutModal from '@/components/workout/RegenerateWorkoutModal'
import ExerciseVideoButton from '@/components/workout/ExerciseVideoButton'

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

    let latestPlan = profile?.preferences?.latest_workout_plan || null
    const lastGeneratedStr = profile?.preferences?.last_workout_generated

    let currentWorkout = null
    let targetWorkoutDay = 1

    if (latestPlan && lastGeneratedStr) {
        const lastGeneratedDate = new Date(lastGeneratedStr)
        lastGeneratedDate.setHours(0, 0, 0, 0)

        const targetDate = new Date(dateToUse)
        targetDate.setHours(0, 0, 0, 0)

        const diffTime = targetDate.getTime() - lastGeneratedDate.getTime()
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

        if (diffDays >= 0 && diffDays < latestPlan.durationInDays) {
            targetWorkoutDay = diffDays + 1
            currentWorkout = latestPlan.workouts?.find((w: any) => w.day === targetWorkoutDay)
        } else {
            latestPlan = null // Plan is expired for the selected date
        }
    }

    return (
        <div className="min-h-screen bg-background pb-24">
            {/* Header */}
            <WeekCalendar dateString={dateString} />

            <main className="max-w-md mx-auto px-6 space-y-6">

                {latestPlan && currentWorkout ? (
                    <>
                        {/* Workout Overview */}
                        <div className="bg-card rounded-3xl p-6 shadow-sm border">
                            <div className="flex justify-between items-center mb-6 border-b pb-4">
                                <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                                    Dan {targetWorkoutDay} od {latestPlan.durationInDays}
                                </div>
                                <div className="flex items-center gap-2">
                                    <RegenerateWorkoutModal />
                                    <div className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">
                                        Aktivni plan
                                    </div>
                                </div>
                            </div>

                            {currentWorkout.isRestDay ? (
                                <div className="text-center py-6">
                                    <h2 className="text-2xl font-bold mb-2">Dan za odmor - Aktivni oporavak</h2>
                                    <p className="text-muted-foreground text-sm max-w-[250px] mx-auto">Danas odmaraj. Fokusiraj se na istezanje, laganu šetnju ili potpuni odmor kako bi se pripremio/la za sutra.</p>
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h2 className="text-2xl font-bold mb-1">{currentWorkout.title}</h2>
                                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                                <span className="flex items-center gap-1"><Timer className="w-4 h-4" /> {currentWorkout.duration}</span>
                                                <span className="flex items-center gap-1"><Dumbbell className="w-4 h-4" /> {currentWorkout.exercises?.length || 0} Vežbi</span>
                                            </div>
                                        </div>
                                        <div className="bg-primary/10 p-3 rounded-full text-primary">
                                            <Activity className="w-6 h-6" />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {currentWorkout.warmup && (
                                            <div className="bg-secondary/50 p-3 rounded-xl border">
                                                <span className="text-xs font-bold uppercase text-muted-foreground mb-1 block">Zagrevanje</span>
                                                <p className="text-sm font-medium">{currentWorkout.warmup}</p>
                                            </div>
                                        )}
                                        {currentWorkout.cooldown && (
                                            <div className="bg-blue-50 p-3 rounded-xl text-blue-700 border border-blue-100">
                                                <span className="text-xs font-bold uppercase opacity-70 mb-1 block">Istezanje</span>
                                                <p className="text-sm font-medium">{currentWorkout.cooldown}</p>
                                            </div>
                                        )}
                                    </div>

                                    <Button className="w-full mt-6 rounded-full font-bold h-12 text-md shadow-lg transition-all" size="lg">
                                        Započni trening
                                    </Button>
                                </>
                            )}
                        </div>

                        {/* Exercises List */}
                        {!currentWorkout.isRestDay && currentWorkout.exercises?.length > 0 && (
                            <>
                                <h3 className="text-lg font-bold">Vežbe</h3>
                                <div className="space-y-3">
                                    {currentWorkout.exercises.map((exercise: any, index: number) => (
                                        <Card key={index} className="border shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                                            <CardContent className="p-4 flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-secondary/50 flex items-center justify-center font-bold text-muted-foreground shrink-0 border">
                                                    {index + 1}
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-bold">{exercise.name}</h4>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                                            {exercise.sets} Serija
                                                        </span>
                                                        <span className="text-xs font-bold bg-secondary/80 text-secondary-foreground px-2 py-0.5 rounded-full">
                                                            {exercise.reps} Ponavljanja
                                                        </span>
                                                    </div>
                                                    {exercise.notes && (
                                                        <p className="text-xs text-muted-foreground mt-2 border-t pt-2">{exercise.notes}</p>
                                                    )}
                                                    <ExerciseVideoButton
                                                        exerciseName={exercise.name}
                                                        exerciseEnglishName={exercise.englishName}
                                                    />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </>
                        )}
                    </>
                ) : (
                    <GenerateWorkout />
                )}
            </main>
        </div>
    )
}
