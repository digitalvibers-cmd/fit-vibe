
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Flame, Utensils, Activity, PlayCircle } from 'lucide-react'

import GeneratePlanButton from './GeneratePlanButton' // Client component for interactivity

// Helper function to calculate BMI
function calculateBMI(weight: number, height: number) {
    const heightInMeters = height / 100
    return (weight / (heightInMeters * heightInMeters)).toFixed(1)
}

function getBMICategory(bmi: number) {
    if (bmi < 18.5) return 'Underweight'
    if (bmi < 25) return 'Normal weight'
    if (bmi < 30) return 'Overweight'
    return 'Obese'
}

export default async function DashboardPage() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return redirect('/login')
    }

    // Fetch profile
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    if (!profile?.age || !profile?.gender || !profile?.height) {
        redirect('/onboarding')
    }

    // Fetch latest goal
    let { data: goalData } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()

    const goal = goalData || { target_weight: profile.preferences?.target_weight || 70, current_weight: profile.preferences?.currentWeight || 75 }

    // Parse preferences
    const prefs = profile.preferences || {}
    const commitment = prefs.commitment || 0
    // Check if we have generated plans
    const latestWorkoutPlan = prefs.latest_workout_plan || null
    const latestMealPlan = prefs.latest_meal_plan || null
    const hasAnyPlan = latestWorkoutPlan || latestMealPlan

    // Get today's workout and meal if plan exists
    const todayWorkout = latestWorkoutPlan?.workouts?.find((w: any) => w.day === 1) || latestWorkoutPlan?.workouts?.[0] || null
    const todayMeal = latestMealPlan?.days?.find((d: any) => d.day === 1) || latestMealPlan?.days?.[0] || null

    // Calculate BMI
    const bmi = calculateBMI(Number(goal.current_weight), profile.height)
    const bmiCategory = getBMICategory(Number(bmi))

    return (
        <div className="min-h-screen bg-background pb-24">

            {/* Header */}
            <div className="bg-primary/5 rounded-b-[3rem] px-6 pt-12 pb-16 shadow-sm mb-6">
                <div className="max-w-md mx-auto">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-muted-foreground text-sm font-medium uppercase tracking-wider">Dashboard</h2>
                            <h1 className="text-3xl font-bold mt-1">Hello, {profile.display_name?.split(' ')[0] || 'User'}!</h1>
                        </div>
                        <Link href="/profile">
                            <div className="bg-white p-2 rounded-full shadow-sm">
                                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                                    {profile.display_name?.[0] || 'U'}
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Main Stats Card (Weight Goal) */}
                    <Card className="border-0 shadow-lg bg-primary text-primary-foreground overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-3 opacity-10">
                            <Activity className="w-32 h-32" />
                        </div>
                        <CardContent className="p-6 relative z-10">
                            <div className="flex justify-between items-end mb-4">
                                <div>
                                    <p className="text-primary-foreground/80 font-medium mb-1">Current Weight</p>
                                    <h3 className="text-5xl font-bold tracking-tight">{goal.current_weight}<span className="text-2xl ml-1 font-normal opacity-80">kg</span></h3>
                                </div>
                                <div className="text-right">
                                    <p className="text-primary-foreground/80 font-medium mb-1">Target</p>
                                    <h3 className="text-3xl font-bold">{goal.target_weight}<span className="text-lg ml-1 font-normal opacity-80">kg</span></h3>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-sm font-medium opacity-90">
                                    <span>Progress</span>
                                    <span>To Go: {(Number(goal.current_weight) - Number(goal.target_weight)).toFixed(1)} kg</span>
                                </div>
                                <div className="h-3 bg-black/20 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-white rounded-full"
                                        style={{ width: '45%' }}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <main className="max-w-md mx-auto px-6 space-y-6">

                {/* Secondary Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <Card className="border-none shadow-md bg-card">
                        <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-2">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-1">
                                <Activity className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-2xl font-bold">{bmi}</h4>
                                <p className="text-xs text-muted-foreground font-medium uppercase">{bmiCategory}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-md bg-card">
                        <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-2">
                            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mb-1">
                                <Flame className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="text-2xl font-bold">{commitment}x</h4>
                                <p className="text-xs text-muted-foreground font-medium uppercase">Workouts/Week</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Todays Plan Section */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold">Today's Plan</h3>
                        <Link href="/meals">
                            <Button variant="ghost" size="sm" className="text-primary">View Calendar</Button>
                        </Link>
                    </div>

                    {hasAnyPlan ? (
                        <div className="space-y-4">
                            {todayWorkout && (
                                <Link href="/workout" className="block">
                                    <Card className="border-none shadow-sm hover:shadow-md transition-all cursor-pointer">
                                        <CardContent className="p-4 flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                                <Activity className="w-6 h-6" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold">{todayWorkout.isRestDay ? 'Rest Day' : (todayWorkout.title || 'Workout')}</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    {todayWorkout.isRestDay ? 'Active Recovery' : `${todayWorkout.duration || ''} • ${todayWorkout.exercises?.length || 0} Exercises`}
                                                </p>
                                            </div>
                                            <div className="h-10 w-10 rounded-full flex items-center justify-center hover:bg-accent hover:text-accent-foreground">
                                                <PlayCircle className="w-6 h-6 text-primary" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            )}

                            {todayMeal && (
                                <Link href="/meals" className="block">
                                    <Card className="border-none shadow-sm hover:shadow-md transition-all cursor-pointer">
                                        <CardContent className="p-4 flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                                                <Utensils className="w-6 h-6" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold">{todayMeal.total_calories} kcal Target</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    {todayMeal.meals?.length || 0} Meals • {todayMeal.macros?.protein || '-'} Protein
                                                </p>
                                            </div>
                                            <div className="h-10 w-10 rounded-full flex items-center justify-center hover:bg-accent hover:text-accent-foreground">
                                                <Plus className="w-5 h-5" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            )}
                        </div>
                    ) : (
                        /* AI Coach Promo / Generate Button */
                        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 text-white border-none shadow-xl">
                            <CardContent className="p-6 relative overflow-hidden">
                                <div className="relative z-10 space-y-4">
                                    <div>
                                        <h3 className="text-lg font-bold mb-1">AI Coach is ready</h3>
                                        <p className="text-gray-300 text-sm">Generate your personalized workout & meal plan based on your assessment.</p>
                                    </div>
                                    <GeneratePlanButton />
                                </div>
                                <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-primary/20 rounded-full blur-2xl"></div>
                            </CardContent>
                        </Card>
                    )}
                </div>

            </main>
        </div>
    )
}
