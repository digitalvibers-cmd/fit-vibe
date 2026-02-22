'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { generatePlan } from '../actions/generate-plan'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

export default function GeneratePlanButton() {
    const [loading, setLoading] = useState(false)

    const handleGenerate = async () => {
        setLoading(true)
        try {
            const result = await generatePlan()
            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success("Plan generated successfully!")
            }
        } catch (e) {
            toast.error("Something went wrong.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-white text-gray-900 hover:bg-gray-100 font-bold rounded-full"
        >
            {loading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Plan...
                </>
            ) : (
                'Generate Personalized Plan'
            )}
        </Button>
    )
}
