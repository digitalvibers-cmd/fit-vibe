'use client'

import { resetPasswordRequest } from '@/app/auth/actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Mail } from 'lucide-react'
import Link from 'next/link'
import { useActionState } from 'react'

export default function ForgotPasswordPage() {
    const [state, formAction, isPending] = useActionState(resetPasswordRequest, null)

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-900 sm:px-6 lg:px-8">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Zaboravljena lozinka</CardTitle>
                    <CardDescription>
                        Unesite vaš email i poslaćemo vam link za resetovanje lozinke.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {state?.success ? (
                        <div className="space-y-4">
                            <div className="flex flex-col items-center gap-3 rounded-xl bg-green-50 p-6 text-center dark:bg-green-900/20">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-800">
                                    <Mail className="h-6 w-6 text-green-600 dark:text-green-400" />
                                </div>
                                <p className="text-sm font-medium text-green-800 dark:text-green-300">
                                    {state.success}
                                </p>
                            </div>
                            <div className="text-center text-sm text-muted-foreground">
                                Niste dobili email?{' '}
                                <button
                                    onClick={() => window.location.reload()}
                                    className="underline hover:text-foreground"
                                >
                                    Pošalji ponovo
                                </button>
                            </div>
                        </div>
                    ) : (
                        <form action={formAction} className="grid gap-4">
                            {state?.error && (
                                <div className="text-sm font-medium text-destructive bg-destructive/10 p-3 rounded-md">
                                    {state.error}
                                </div>
                            )}
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email adresa</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    autoComplete="email"
                                />
                            </div>
                            <Button className="w-full" type="submit" disabled={isPending}>
                                {isPending ? 'Slanje...' : 'Pošalji link za reset'}
                            </Button>
                        </form>
                    )}
                    <div className="mt-4 text-center text-sm">
                        <Link href="/login" className="underline hover:text-foreground">
                            Nazad na prijavu
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
