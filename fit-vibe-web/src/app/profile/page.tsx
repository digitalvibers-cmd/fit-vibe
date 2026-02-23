import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import ProfileForm from './ProfileForm'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { signOut } from '../auth/actions'

export default async function ProfilePage() {
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
                    <h1 className="text-xl font-bold">Podešavanja Profila</h1>
                </div>
            </div>

            <main className="max-w-md mx-auto px-6 py-8">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary text-3xl font-bold mb-4">
                        {profile.display_name?.[0] || 'U'}
                    </div>
                    <p className="text-muted-foreground text-sm">Dodirni da promeniš avatar (Uskoro)</p>
                </div>

                <ProfileForm profile={profile} />

                <div className="mt-12 pt-8 border-t">
                    <form action={signOut}>
                        <Button variant="destructive" className="w-full" type="submit">
                            Odjavi se
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}
