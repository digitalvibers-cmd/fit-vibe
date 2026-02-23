import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import LogWeightForm from './LogWeightForm'
import SetGoalForm from './SetGoalForm'
import GoalsChart from './GoalsChart'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Target } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default async function GoalsPage() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return redirect('/login')
    }

    // Fetch weight logs
    const { data: logs } = await supabase
        .from('weight_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false })
        .limit(30)

    const currentWeight = logs && logs.length > 0 ? logs[0].weight : 'N/A'

    // Fetch Goal
    const { data: goal } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', user.id)
        .single()

    // Calculate progress
    let startWeight = goal?.current_weight || (currentWeight !== 'N/A' ? currentWeight : 0);
    let targetWeight = goal?.target_weight;
    let progress = 0;

    if (startWeight && targetWeight && currentWeight !== 'N/A') {
        const totalDiff = Math.abs(startWeight - targetWeight);
        const currentDiff = Math.abs(currentWeight - targetWeight);

        if (totalDiff === 0 || currentWeight === targetWeight) {
            progress = 100;
        } else {
            progress = 100 - (currentDiff / totalDiff) * 100;
            progress = Math.max(0, Math.min(100, Math.round(progress)));
        }
    }

    return (
        <div className="min-h-screen bg-background pb-24">
            {/* Header */}
            <div className="bg-white p-6 sticky top-0 z-10 border-b">
                <div className="flex items-center gap-4 max-w-md mx-auto">
                    <Link href="/dashboard">
                        <Button variant="ghost" size="icon" className="-ml-2">
                            <ChevronLeft className="w-6 h-6" />
                        </Button>
                    </Link>
                    <h1 className="text-xl font-bold">Progres i Ciljevi</h1>
                </div>
            </div>

            <main className="max-w-md mx-auto px-6 py-8 space-y-8">
                {goal ? (
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Ciljana težina</p>
                                    <p className="text-2xl font-bold text-primary">{targetWeight} kg</p>
                                    {goal.target_date && (
                                        <p className="text-xs text-muted-foreground mt-1">Do: {new Date(goal.target_date).toLocaleDateString('sr-RS')}</p>
                                    )}
                                </div>
                                <SetGoalForm currentTarget={targetWeight} currentDate={goal.target_date} />
                            </div>
                            {/* Progress bar */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-medium text-muted-foreground">
                                    <span>Početna: {startWeight} kg</span>
                                    <span>{progress}%</span>
                                </div>
                                <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary transition-all duration-1000 ease-out"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="flex justify-between items-center bg-secondary/30 p-4 rounded-xl border border-secondary">
                        <div className="flex items-center gap-3">
                            <Target className="w-5 h-5 text-primary" />
                            <span className="text-sm font-medium">Nemaš postavljen cilj</span>
                        </div>
                        <SetGoalForm />
                    </div>
                )}

                <div className="flex justify-between items-center mt-8">
                    <div>
                        <h2 className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Trenutna težina</h2>
                        <p className="text-4xl font-black text-foreground">{currentWeight} <span className="text-lg font-medium text-muted-foreground">kg</span></p>
                    </div>
                    <LogWeightForm />
                </div>

                <GoalsChart data={logs || []} />

            </main>
        </div>
    )
}
