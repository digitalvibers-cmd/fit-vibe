'use client'

import { Youtube } from 'lucide-react'

interface ExerciseVideoButtonProps {
    exerciseName: string
    exerciseEnglishName?: string
}

export default function ExerciseVideoButton({ exerciseName, exerciseEnglishName }: ExerciseVideoButtonProps) {
    const searchTerm = exerciseEnglishName || exerciseName
    const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchTerm + ' exercise tutorial')}`

    const handleClick = () => {
        window.open(youtubeUrl, '_blank', 'noopener,noreferrer')
    }

    return (
        <button
            onClick={handleClick}
            aria-label={`Pogledaj YouTube video za vežbu: ${exerciseName}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-red-500 hover:text-red-600 mt-2 transition-colors group"
        >
            <Youtube className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
            <span>Pogledaj Video</span>
        </button>
    )
}
