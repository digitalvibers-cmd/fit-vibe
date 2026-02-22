'use client'

import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getWeekDays, formatDate } from '@/utils/date-helpers'
import { usePathname, useSearchParams } from 'next/navigation'

interface WeekCalendarProps {
    dateString?: string
}

export default function WeekCalendar({ dateString }: WeekCalendarProps) {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    // Parse date from prop or fallback to today
    // We treat the passed dateString as the "selected" date.
    // Ensure we handle timezone correctly (simple date part)
    const date = dateString ? new Date(dateString) : new Date();
    const weekDays = getWeekDays(date)
    const currentMonth = date.toLocaleString('default', { month: 'long' })
    const currentYear = date.getFullYear()

    // Navigation logic for Previous/Next week
    // Since this is a server component friendly approach, we use Links with updated `date` param
    // But `date` prop comes from parent which reads searchParams.

    const prevWeekDate = new Date(date)
    prevWeekDate.setDate(date.getDate() - 7)

    const nextWeekDate = new Date(date)
    nextWeekDate.setDate(date.getDate() + 7)

    const createQueryString = (newDate: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('date', newDate)
        return params.toString()
    }

    return (
        <div className="bg-primary/5 rounded-b-[3rem] px-6 pt-12 pb-12 shadow-sm mb-6">
            <div className="max-w-md mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <Link href={`${pathname}?${createQueryString(formatDate(prevWeekDate))}`}>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <ChevronLeft className="w-6 h-6" />
                        </Button>
                    </Link>
                    <h1 className="text-xl font-bold">{currentMonth} {currentYear}</h1>
                    <Link href={`${pathname}?${createQueryString(formatDate(nextWeekDate))}`}>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <ChevronRight className="w-6 h-6" />
                        </Button>
                    </Link>
                </div>

                {/* Horizontal Calendar Stripe */}
                <div className="flex justify-between items-center bg-white p-4 rounded-3xl shadow-sm">
                    {weekDays.map((day, i) => {
                        const isSelected = formatDate(day) === formatDate(date);
                        const isToday = formatDate(day) === formatDate(new Date()); // Optional visual cue for "Actual Today" if different from selected

                        // We use `isSelected` for the main active style
                        // But maybe we want to distinguish "Selected" vs "Today"
                        // Current design used "isToday" as the active style. Let's map "isSelected" to that bold style.

                        return (
                            <Link
                                key={i}
                                href={`${pathname}?${createQueryString(formatDate(day))}`}
                                className={`flex flex-col items-center gap-1 ${isSelected ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground'} px-3 py-3 rounded-2xl transition-all hover:bg-primary/10`}
                            >
                                <span className="text-xs font-semibold uppercase">{day.toLocaleDateString('en-US', { weekday: 'narrow' })}</span>
                                <span className={`text-lg font-bold ${isSelected ? '' : 'text-foreground'}`}>{day.getDate()}</span>
                                {/* Dot indicator - Mocking for Mon/Wed/Fri logic from generic design or just static */}
                                {/* Keeping it generic for now or removing, as data is not seemingly bound to dates yet */}
                                {[1, 3, 5].includes(i) && (
                                    <div className={`w-1 h-1 rounded-full ${isSelected ? 'bg-white' : 'bg-orange-500'} opacity-50`}></div>
                                )}
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
