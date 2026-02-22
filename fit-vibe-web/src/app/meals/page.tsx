
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Plus, Calendar, Utensils, CheckCircle2 } from 'lucide-react'

import WeekCalendar from '@/components/common/WeekCalendar'
import { formatDate } from '@/utils/date-helpers'
import GenerateMeal from './GenerateMeal'

export default async function MealsPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
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

    let latestPlan = profile?.preferences?.latest_meal_plan || null
    const lastGeneratedStr = profile?.preferences?.last_meal_generated

    let currentDayMeal = null
    let targetMealDay = 1

    if (latestPlan && lastGeneratedStr) {
        const lastGeneratedDate = new Date(lastGeneratedStr)
        lastGeneratedDate.setHours(0, 0, 0, 0)

        const targetDate = new Date(dateToUse)
        targetDate.setHours(0, 0, 0, 0)

        const diffTime = targetDate.getTime() - lastGeneratedDate.getTime()
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

        if (diffDays >= 0 && diffDays < latestPlan.durationInDays) {
            targetMealDay = diffDays + 1
            currentDayMeal = latestPlan.days?.find((d: any) => d.day === targetMealDay)
        } else {
            latestPlan = null // Plan is expired for the selected date
        }
    }

    return (
        <div className="min-h-screen bg-background pb-24">
            {/* Header */}
            <WeekCalendar dateString={dateString} />

            <main className="max-w-md mx-auto px-6 space-y-6">

                {latestPlan && currentDayMeal ? (
                    <>
                        <div className="flex justify-between items-center mb-2">
                            <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                                Day {targetMealDay} of {latestPlan.durationInDays}
                            </div>
                            <div className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">
                                Active Plan
                            </div>
                        </div>

                        {/* Stats Summary */}
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div className="bg-card p-3 rounded-2xl border shadow-sm flex flex-col items-center justify-center">
                                <p className="text-xs text-muted-foreground mb-1">Calories</p>
                                <p className="font-bold text-lg">{currentDayMeal.total_calories || '-'}</p>
                            </div>
                            <div className="bg-card p-3 rounded-2xl border shadow-sm flex flex-col items-center justify-center">
                                <p className="text-xs text-muted-foreground mb-1">Protein</p>
                                <p className="font-bold text-lg">{currentDayMeal.macros?.protein || '-'}</p>
                            </div>
                            <div className="bg-card p-3 rounded-2xl border shadow-sm flex flex-col items-center justify-center">
                                <p className="text-xs text-muted-foreground mb-1">Carbs</p>
                                <p className="font-bold text-lg">{currentDayMeal.macros?.carbs || '-'}</p>
                            </div>
                        </div>

                        {/* Meal List */}
                        <div className="space-y-4 pt-4">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-bold">Today's Meals</h2>
                                <Button size="sm" variant="outline" className="rounded-full gap-2 hover:bg-primary/5 hover:text-primary transition-colors">
                                    <Plus className="w-4 h-4" /> Add Meal
                                </Button>
                            </div>

                            {currentDayMeal.meals?.map((meal: any, index: number) => (
                                <Card key={index} className="border shadow-sm hover:shadow-md transition-shadow rounded-2xl overflow-hidden">
                                    <CardContent className="p-4 flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 shrink-0 border border-orange-200">
                                            <Utensils className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <h4 className="font-bold">{meal.name}</h4>
                                                <span className="text-xs font-bold bg-secondary/80 text-secondary-foreground px-2 py-0.5 rounded-full ml-2 whitespace-nowrap">{meal.calories} kcal</span>
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                                {meal.items?.join(', ')}
                                            </p>
                                        </div>
                                        <Button size="icon" variant="ghost" className="rounded-full text-muted-foreground hover:text-green-600 hover:bg-green-50 shrink-0">
                                            <CheckCircle2 className="w-6 h-6" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </>
                ) : (
                    <GenerateMeal />
                )}
            </main>
        </div>
    )
}
