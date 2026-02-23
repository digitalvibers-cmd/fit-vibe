'use client'

import { useActionState, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { updateGoal } from '../actions/update-goal'
import { Loader2, Target } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface GoalState {
    message?: string;
    error?: string;
    success?: boolean;
}

const initialState: GoalState = {
    message: '',
    error: '',
    success: false
}

export default function SetGoalForm({ currentTarget, currentDate }: { currentTarget?: number, currentDate?: string }) {
    const [open, setOpen] = useState(false)
    const [state, formAction, isPending] = useActionState(updateGoal, initialState)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <Target className="w-4 h-4" /> Podesi cilj
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Tvoj fitnes cilj</DialogTitle>
                    <DialogDescription>
                        Unesi ciljanu težinu i datum do kog želiš to da ostvariš.
                    </DialogDescription>
                </DialogHeader>
                <form action={formAction} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="targetWeight" className="text-right">
                            Težina (kg)
                        </Label>
                        <Input
                            id="targetWeight"
                            name="targetWeight"
                            type="number"
                            step="0.1"
                            defaultValue={currentTarget || ''}
                            className="col-span-3"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="targetDate" className="text-right">
                            Datum
                        </Label>
                        <Input
                            id="targetDate"
                            name="targetDate"
                            type="date"
                            defaultValue={currentDate || ''}
                            className="col-span-3"
                            required
                        />
                    </div>

                    {state?.error && (
                        <p className="text-sm text-red-500 text-center">{state.error}</p>
                    )}
                    {state?.success && (
                        <p className="text-sm text-green-500 text-center">{state.message}</p>
                    )}

                    <div className="flex justify-end mt-4">
                        <Button type="submit" disabled={isPending}>
                            {isPending ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : null}
                            Sačuvaj cilj
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
