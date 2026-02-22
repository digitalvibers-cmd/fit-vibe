import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import LogWeightForm from './LogWeightForm'
import GoalsChart from './GoalsChart'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'

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
                    <h1 className="text-xl font-bold">Progress & Goals</h1>
                </div>
            </div>

            <main className="max-w-md mx-auto px-6 py-8 space-y-8">

                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Current Weight</h2>
                        <p className="text-4xl font-black text-primary">{currentWeight} <span className="text-lg font-medium text-muted-foreground">kg</span></p>
                    </div>
                    <LogWeightForm />
                </div>

                <GoalsChart data={logs || []} />

            </main>
        </div>
    )
}
