
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Plus, Calendar, Utensils, CheckCircle2 } from 'lucide-react'

import WeekCalendar from '@/components/common/WeekCalendar'
import { formatDate } from '@/utils/date-helpers'

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

    // Mock data based on AI plan if available, otherwise empty
    const latestPlan = profile?.preferences?.latest_plan?.meal || null

    return (
        <div className="min-h-screen bg-background pb-24">
            {/* Header */}
            <WeekCalendar dateString={dateString} />

            <main className="max-w-md mx-auto px-6 space-y-6">

                {/* Stats Summary */}
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-card p-3 rounded-2xl border shadow-sm">
                        <p className="text-xs text-muted-foreground mb-1">Calories</p>
                        <p className="font-bold">{latestPlan?.total_calories || '-'}</p>
                    </div>
                    <div className="bg-card p-3 rounded-2xl border shadow-sm">
                        <p className="text-xs text-muted-foreground mb-1">Protein</p>
                        <p className="font-bold">{latestPlan?.macros?.protein || '-'}</p>
                    </div>
                    <div className="bg-card p-3 rounded-2xl border shadow-sm">
                        <p className="text-xs text-muted-foreground mb-1">Carbs</p>
                        <p className="font-bold">{latestPlan?.macros?.carbs || '-'}</p>
                    </div>
                </div>

                {/* Meal List */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-bold">Today's Meals</h2>
                        <Button size="sm" variant="outline" className="rounded-full gap-2">
                            <Plus className="w-4 h-4" /> Add Meal
                        </Button>
                    </div>

                    {latestPlan ? (
                        latestPlan.meals.map((meal: any, index: number) => (
                            <Card key={index} className="border-none shadow-sm hover:shadow-md transition-all">
                                <CardContent className="p-4 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                                        <Utensils className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold">{meal.name}</h4>
                                            <span className="text-xs font-medium bg-secondary px-2 py-1 rounded-full">{meal.calories} kcal</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                                            {meal.items.join(', ')}
                                        </p>
                                    </div>
                                    <Button size="icon" variant="ghost" className="rounded-full text-muted-foreground hover:text-green-600">
                                        <CheckCircle2 className="w-6 h-6" />
                                    </Button>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <div className="text-center py-12 text-muted-foreground">
                            <p>No meal plan generated for today.</p>
                            <Button className="mt-4" variant="secondary">Generate Plan</Button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
