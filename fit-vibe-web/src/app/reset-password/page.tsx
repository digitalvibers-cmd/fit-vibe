'use client'

import { updatePassword } from '@/app/auth/actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useActionState, useState } from 'react'

export default function ResetPasswordPage() {
    const [state, formAction, isPending] = useActionState(updatePassword, null)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const passwordsMatch = password === confirmPassword || confirmPassword === ''
    const isValid = password.length >= 6 && confirmPassword.length >= 6 && password === confirmPassword

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-900 sm:px-6 lg:px-8">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Nova lozinka</CardTitle>
                    <CardDescription>
                        Unesite vašu novu lozinku. Mora imati najmanje 6 karaktera.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={formAction} className="grid gap-4">
                        {state?.error && (
                            <div className="text-sm font-medium text-destructive bg-destructive/10 p-3 rounded-md">
                                {state.error}
                            </div>
                        )}
                        <div className="grid gap-2">
                            <Label htmlFor="password">Nova lozinka</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                                minLength={6}
                                autoComplete="new-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="confirmPassword">Potvrdi lozinku</Label>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                minLength={6}
                                autoComplete="new-password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className={!passwordsMatch ? 'border-destructive focus-visible:ring-destructive' : ''}
                            />
                            {!passwordsMatch && (
                                <p className="text-xs text-destructive">Lozinke se ne poklapaju.</p>
                            )}
                        </div>
                        <Button
                            className="w-full"
                            type="submit"
                            disabled={isPending || !isValid}
                        >
                            {isPending ? 'Čuvanje...' : 'Sačuvaj novu lozinku'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
