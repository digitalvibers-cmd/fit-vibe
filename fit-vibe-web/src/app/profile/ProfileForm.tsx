'use client'

import { useActionState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { updateProfile } from '../actions/update-profile'
import { Loader2 } from 'lucide-react'

interface ProfileState {
    message?: string;
    error?: string | Record<string, any>;
    success?: boolean;
}

const initialState: ProfileState = {
    message: '',
    error: '',
    success: false
}

export default function ProfileForm({ profile }: { profile: any }) {
    const [state, formAction, isPending] = useActionState(updateProfile, initialState)

    return (
        <form action={formAction} className="space-y-6">
            <div className="grid gap-4">
                <div className="space-y-2">
                    <Label htmlFor="display_name">Display Name</Label>
                    <Input
                        id="display_name"
                        name="display_name"
                        defaultValue={profile.display_name || ''}
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="age">Age</Label>
                        <Input
                            id="age"
                            name="age"
                            type="number"
                            defaultValue={profile.age || ''}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="height">Height (cm)</Label>
                        <Input
                            id="height"
                            name="height"
                            type="number"
                            defaultValue={profile.height || ''}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <select
                        id="gender"
                        name="gender"
                        defaultValue={profile.gender || ''}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="goal">Primary Goal</Label>
                    <select
                        id="goal"
                        name="goal"
                        defaultValue={profile.preferences?.goal || ''}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <option value="Lose Weight">Lose Weight</option>
                        <option value="Build Muscle">Build Muscle</option>
                        <option value="Keep Fit">Keep Fit</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="activityLevel">Activity Level</Label>
                    <select
                        id="activityLevel"
                        name="activityLevel"
                        defaultValue={profile.preferences?.activityLevel || ''}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <option value="Sedentary">Sedentary</option>
                        <option value="Lightly Active">Lightly Active</option>
                        <option value="Moderately Active">Moderately Active</option>
                        <option value="Very Active">Very Active</option>
                    </select>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="trainingLocation">Training Location</Label>
                <select
                    id="trainingLocation"
                    name="trainingLocation"
                    defaultValue={profile.preferences?.trainingLocation || ''}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <option value="gym">Gym</option>
                    <option value="home">Home</option>
                </select>
            </div>

            <div className="space-y-2">
                <Label htmlFor="trainingEquipment">Training Equipment (comma separated)</Label>
                <Input
                    id="trainingEquipment"
                    name="trainingEquipment"
                    defaultValue={profile.preferences?.trainingEquipment?.join(', ') || ''}
                    placeholder="e.g. Dumbbells, Bands"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="aiInput">Additional AI Instructions</Label>
                <Input
                    id="aiInput"
                    name="aiInput"
                    defaultValue={profile.preferences?.aiInput || ''}
                    placeholder="e.g. I have bad knees"
                />
            </div>

            {state?.error && (
                <p className="text-sm text-red-500">{typeof state.error === 'string' ? state.error : 'Invalid input'}</p>
            )}
            {state?.success && (
                <p className="text-sm text-green-500">{state.message}</p>
            )}

            <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? <Loader2 className="animate-spin" /> : 'Save Changes'}
            </Button>
        </form>
    )
}
