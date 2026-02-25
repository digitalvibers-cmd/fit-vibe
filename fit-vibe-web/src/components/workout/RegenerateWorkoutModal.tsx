'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Loader2, RefreshCw } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { generateWorkoutPlan } from '@/app/actions/generate-workout-plan'

export default function RegenerateWorkoutModal() {
    const [open, setOpen] = useState(false)
    const [isGenerating, setIsGenerating] = useState(false)
    const [duration, setDuration] = useState<number>(7)

    const handleGenerate = async () => {
        setIsGenerating(true)
        try {
            const res = await generateWorkoutPlan(duration)
            if (res?.error) {
                toast.error(res.error)
            } else {
                toast.success('Novi plan treninga je uspešno generisan od danas!')
                setOpen(false)
            }
        } catch (error) {
            toast.error('Greška pri generisanju plana.')
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-full gap-2 text-xs font-bold border-primary text-primary hover:bg-primary/10">
                    <RefreshCw className="w-3 h-3" /> Regeneriši Plan
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-3xl">
                <DialogHeader>
                    <DialogTitle className="text-xl">Regeneriši Plan Treninga</DialogTitle>
                    <DialogDescription>
                        Ovo će prebrisati tvoj trenutni plan i generisati potpuno nov plan počevši od danas.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    <div className="space-y-3 bg-secondary/30 p-4 rounded-2xl">
                        <p className="text-sm font-semibold text-foreground text-center">Izaberi dužinu novog plana</p>
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
                        className="w-full rounded-full font-bold h-12 shadow"
                    >
                        {isGenerating ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Kreiram plan...</> : 'Generiši Novi Plan'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
