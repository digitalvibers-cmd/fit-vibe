
'use client'

import { signup } from '@/app/auth/actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useActionState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function RegisterPage() {
    const [state, formAction, isPending] = useActionState(signup, null)

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-900 sm:px-6 lg:px-8">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Registracija</CardTitle>
                    <CardDescription>
                        Unesi svoje podatke za kreiranje naloga
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
                            <Label htmlFor="fullName">Ime i prezime</Label>
                            <Input id="fullName" name="fullName" placeholder="Petar Petrović" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Lozinka</Label>
                            <Input id="password" name="password" type="password" required />
                        </div>
                        <Button className="w-full" type="submit" disabled={isPending}>
                            {isPending ? 'Kreiranje...' : 'Kreiraj nalog'}
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Već imaš nalog?{" "}
                        <Link href="/login" className="underline">
                            Prijavi se
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
