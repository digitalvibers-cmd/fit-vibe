'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Dumbbell, Utensils, User, Target } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function BottomNav() {
    const pathname = usePathname()

    // Hide on login/register/onboarding and all static pages
    const hiddenPaths = [
        '/login', '/register', '/onboarding', '/',
        '/o-nama', '/uslovi-koriscenja', '/politika-privatnosti',
        '/kontakt', '/faq', '/cenovnik', '/opcije'
    ]
    if (hiddenPaths.includes(pathname)) {
        return null
    }

    const navItems = [
        { href: '/dashboard', label: 'Početna', icon: Home },
        { href: '/workout', label: 'Trening', icon: Dumbbell },
        { href: '/meals', label: 'Ishrana', icon: Utensils },
        { href: '/goals', label: 'Progres', icon: Target }, // Changed Profile to Progress/Goals as per plan implies goal tracking
        // Profile will be accessible via Avatar in dashboard for now, or we can add it here.
        // Plan said: "Profile/Goals (User/Target)". Let's use User icon for Profile page which will have goals.
        { href: '/profile', label: 'Profil', icon: User },
    ]

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-2 pb-6 z-50 flex justify-between items-center shadow-[0_-5px_20px_rgba(0,0,0,0.03)]">
            {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

                // Special case for dashboard to not match everything
                const isHomeActive = item.href === '/dashboard' && pathname === '/dashboard'
                const activeState = item.href === '/dashboard' ? isHomeActive : isActive

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex flex-col items-center gap-1 transition-colors p-2 rounded-xl",
                            activeState
                                ? "text-primary bg-primary/5"
                                : "text-muted-foreground hover:text-primary/70"
                        )}
                        data-testid={`nav-${item.label.toLowerCase()}`}
                    >
                        <Icon className={cn("w-6 h-6", activeState && "fill-current")} />
                        <span className="text-[10px] font-medium">{item.label}</span>
                    </Link>
                )
            })}
        </div>
    )
}
