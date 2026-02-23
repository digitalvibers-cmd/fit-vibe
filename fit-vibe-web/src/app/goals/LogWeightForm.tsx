'use client'

import { useActionState, useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { logWeight } from '../actions/log-weight'
import { Loader2, Plus } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface LogWeightState {
    message?: string;
    error?: string;
    success?: boolean;
}

const initialState: LogWeightState = {
    message: '',
    error: '',
    success: false
}

export default function LogWeightForm() {
    const [open, setOpen] = useState(false)
    const [state, formAction, isPending] = useActionState(logWeight, initialState)

    useEffect(() => {
        if (state?.success) {
            const timer = setTimeout(() => setOpen(false), 1000)
            return () => clearTimeout(timer)
        }
    }, [state?.success])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <Plus className="w-4 h-4" /> Upiši težinu
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Upiši današnju težinu</DialogTitle>
                    <DialogDescription>
                        Unesi svoju trenutnu težinu kako bi pratio napredak.
                    </DialogDescription>
                </DialogHeader>
                <form action={formAction} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="weight" className="text-right">
                            Težina (kg)
                        </Label>
                        <Input
                            id="weight"
                            name="weight"
                            type="number"
                            step="0.1"
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

                    <div className="flex justify-end">
                        <Button type="submit" disabled={isPending}>
                            {isPending ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : null}
                            Sačuvaj
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
