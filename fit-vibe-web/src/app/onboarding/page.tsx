"use client"

import { useState } from 'react'
import { submitOnboarding } from './actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea' // Need to make sure this exists or use Input
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { ChevronRight, ChevronLeft, Check, Upload, Mic } from 'lucide-react'

// Steps definition
const STEPS = [
    { id: 'goal', title: 'What is your fitness goal?' },
    { id: 'gender', title: 'What is your gender?' },
    { id: 'age', title: 'What is your age?' },
    { id: 'height', title: 'What is your height?' },
    { id: 'weight', title: 'What is your weight?' },
    { id: 'experience', title: 'What is your fitness experience?' },
    { id: 'injuries', title: 'Do you have any injuries?' },
    { id: 'diet', title: 'Do you assume a specific diet?' },
    { id: 'commitment', title: 'How many days/week will you commit?' },
    { id: 'supplements', title: 'Do you take any supplements?' },
    { id: 'sleep', title: 'How is your sleep quality?' },
    { id: 'photo', title: 'Body Analysis (Optional)' },
    { id: 'ai_input', title: 'Anything else for your AI Coach?' },
]

export default function OnboardingWizard() {
    const [currentStep, setCurrentStep] = useState(0)
    const [formData, setFormData] = useState({
        goal: '',
        gender: 'male' as 'male' | 'female' | 'other',
        age: 25,
        height: 175,
        currentWeight: 75,
        targetWeight: 70,
        experience: 'beginner',
        injuries: [],
        diet: 'classic',
        commitment: 3,
        activityLevel: 'moderate',
        supplements: [],
        sleep: 'good',
        aiInput: '',
    })

    // Helper to toggle array items
    const toggleArrayItem = (field: string, item: string) => {
        setFormData(prev => {
            const current = (prev as any)[field] as string[]
            if (current.includes(item)) {
                return { ...prev, [field]: current.filter(i => i !== item) }
            } else {
                return { ...prev, [field]: [...current, item] }
            }
        })
    }

    const totalSteps = STEPS.length
    const progress = ((currentStep + 1) / totalSteps) * 100

    const handleNext = async () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep(prev => prev + 1)
        } else {
            // Submit
            try {
                toast.promise(submitOnboarding(formData), {
                    loading: 'Creating your personalized plan...',
                    success: 'Welcome to Fit Vibe!',
                    error: 'Failed to create profile.'
                })
            } catch (error) {
                toast.error("Something went wrong.")
            }
        }
    }

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1)
        }
    }

    const updateField = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    // Animation variants
    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 50 : -50,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 50 : -50,
            opacity: 0
        })
    }

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
            {/* Progress Bar */}
            <div className="w-full max-w-md mb-8 space-y-2">
                <div className="flex justify-between text-sm font-medium text-muted-foreground">
                    <span>Assessment</span>
                    <span>{currentStep + 1} of {totalSteps}</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </div>

            <Card className="w-full max-w-md border-0 shadow-none bg-transparent">
                <CardContent className="p-0">
                    <AnimatePresence mode="wait" custom={1}>
                        <motion.div
                            key={currentStep}
                            custom={1}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.3 }}
                            className="space-y-8"
                        >
                            <h1 className="text-3xl font-bold text-center leading-tight">
                                {STEPS[currentStep].title}
                            </h1>

                            {/* Step Content */}
                            <div className="min-h-[350px] flex flex-col justify-center">

                                {/* 1. GOAL */}
                                {currentStep === 0 && (
                                    <div className="space-y-3">
                                        {['Lose weight', 'Gain muscle', 'Endurance', 'Keep fit'].map((g) => (
                                            <button
                                                key={g}
                                                onClick={() => updateField('goal', g)}
                                                className={cn(
                                                    "w-full p-4 rounded-2xl border-2 text-left font-semibold transition-all flex justify-between items-center",
                                                    formData.goal === g
                                                        ? "border-primary bg-primary/10 text-primary"
                                                        : "border-border hover:border-primary/50"
                                                )}
                                            >
                                                {g}
                                                {formData.goal === g && <Check className="w-5 h-5 text-primary" />}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* 2. GENDER */}
                                {currentStep === 1 && (
                                    <div className="grid grid-cols-1 gap-4">
                                        {['male', 'female'].map((g) => (
                                            <button
                                                key={g}
                                                onClick={() => updateField('gender', g)}
                                                className={cn(
                                                    "h-32 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all",
                                                    formData.gender === g
                                                        ? "border-primary bg-primary/10 text-primary"
                                                        : "border-border hover:border-primary/50"
                                                )}
                                            >
                                                <span className="text-lg font-bold capitalize">{g}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* 3. AGE */}
                                {currentStep === 2 && (
                                    <div className="flex flex-col items-center space-y-6">
                                        <div className="text-6xl font-bold text-primary">
                                            {formData.age}
                                        </div>
                                        <input
                                            type="range"
                                            min="16"
                                            max="90"
                                            value={formData.age}
                                            onChange={(e) => updateField('age', Number(e.target.value))}
                                            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                                        />
                                    </div>
                                )}

                                {/* 4. HEIGHT */}
                                {currentStep === 3 && (
                                    <div className="flex flex-col items-center space-y-6">
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-6xl font-bold text-primary">{formData.height}</span>
                                            <span className="text-xl text-muted-foreground">cm</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="100"
                                            max="250"
                                            value={formData.height}
                                            onChange={(e) => updateField('height', Number(e.target.value))}
                                            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                                        />
                                    </div>
                                )}

                                {/* 5. WEIGHT */}
                                {currentStep === 4 && (
                                    <div className="space-y-8">
                                        <div className="space-y-4">
                                            <Label className="text-center block">Current Weight</Label>
                                            <div className="flex justify-center items-baseline gap-1">
                                                <span className="text-5xl font-bold text-primary">{formData.currentWeight}</span>
                                                <span className="text-lg text-muted-foreground">kg</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="30"
                                                max="200"
                                                value={formData.currentWeight}
                                                onChange={(e) => updateField('currentWeight', Number(e.target.value))}
                                                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                                            />
                                        </div>

                                        <div className="space-y-4">
                                            <Label className="text-center block">Target Weight</Label>
                                            <div className="flex justify-center items-baseline gap-1">
                                                <span className="text-5xl font-bold text-primary">{formData.targetWeight}</span>
                                                <span className="text-lg text-muted-foreground">kg</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="30"
                                                max="200"
                                                value={formData.targetWeight}
                                                onChange={(e) => updateField('targetWeight', Number(e.target.value))}
                                                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* 6. EXPERIENCE */}
                                {currentStep === 5 && (
                                    <div className="space-y-3">
                                        {['Beginner', 'Intermediate', 'Advanced'].map((e) => (
                                            <button
                                                key={e}
                                                onClick={() => updateField('experience', e.toLowerCase())}
                                                className={cn(
                                                    "w-full p-4 rounded-2xl border-2 text-left font-semibold transition-all flex justify-between items-center",
                                                    formData.experience === e.toLowerCase()
                                                        ? "border-primary bg-primary/10 text-primary"
                                                        : "border-border hover:border-primary/50"
                                                )}
                                            >
                                                {e}
                                                {formData.experience === e.toLowerCase() && <Check className="w-5 h-5 text-primary" />}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* 7. INJURIES */}
                                {currentStep === 6 && (
                                    <div className="space-y-3">
                                        <p className="text-sm text-center text-muted-foreground mb-4">Select all that apply</p>
                                        {['None', 'Back Pain', 'Knee Pain', 'Shoulder Pain'].map((injury) => (
                                            <button
                                                key={injury}
                                                onClick={() => {
                                                    if (injury === 'None') updateField('injuries', [])
                                                    else toggleArrayItem('injuries', injury)
                                                }}
                                                className={cn(
                                                    "w-full p-4 rounded-2xl border-2 text-left font-semibold transition-all flex justify-between items-center",
                                                    (injury === 'None' && formData.injuries.length === 0) || (formData.injuries as string[]).includes(injury)
                                                        ? "border-primary bg-primary/10 text-primary"
                                                        : "border-border hover:border-primary/50"
                                                )}
                                            >
                                                {injury}
                                                {((injury === 'None' && formData.injuries.length === 0) || (formData.injuries as string[]).includes(injury)) && <Check className="w-5 h-5 text-primary" />}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* 8. DIET */}
                                {currentStep === 7 && (
                                    <div className="grid grid-cols-2 gap-3">
                                        {['Classic', 'Keto', 'Vegan', 'Paleo'].map((diet) => (
                                            <button
                                                key={diet}
                                                onClick={() => updateField('diet', diet.toLowerCase())}
                                                className={cn(
                                                    "aspect-square rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all p-2 text-center",
                                                    formData.diet === diet.toLowerCase()
                                                        ? "border-primary bg-primary/10 text-primary"
                                                        : "border-border hover:border-primary/50"
                                                )}
                                            >
                                                <span className="font-bold">{diet}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* 9. COMMITMENT */}
                                {currentStep === 8 && (
                                    <div className="flex flex-col items-center space-y-6">
                                        <div className="text-8xl font-bold text-primary">
                                            {formData.commitment}x
                                        </div>
                                        <p className="text-muted-foreground">days per week</p>
                                        <input
                                            type="range"
                                            min="1"
                                            max="7"
                                            value={formData.commitment}
                                            onChange={(e) => updateField('commitment', Number(e.target.value))}
                                            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                                        />
                                    </div>
                                )}

                                {/* 10. SUPPLEMENTS */}
                                {currentStep === 9 && (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-3">
                                            {['Whey Protein', 'Creatine', 'Vitamins', 'BCAAs'].map((supp) => (
                                                <button
                                                    key={supp}
                                                    onClick={() => toggleArrayItem('supplements', supp)}
                                                    className={cn(
                                                        "h-24 rounded-2xl border-2 flex items-center justify-center p-2 text-center text-sm font-semibold transition-all",
                                                        (formData.supplements as string[]).includes(supp)
                                                            ? "border-primary bg-primary/10 text-primary"
                                                            : "border-border hover:border-primary/50"
                                                    )}
                                                >
                                                    {supp}
                                                </button>
                                            ))}
                                        </div>
                                        <Button
                                            variant="ghost"
                                            onClick={() => updateField('supplements', [])}
                                            className="w-full text-muted-foreground"
                                        >
                                            I don't take specific supplements
                                        </Button>
                                    </div>
                                )}

                                {/* 11. SLEEP */}
                                {currentStep === 10 && (
                                    <div className="space-y-3">
                                        {['Excellent (>8h)', 'Good (7-8h)', 'Fair (6-7h)', 'Poor (<6h)'].map((sleep) => (
                                            <button
                                                key={sleep}
                                                onClick={() => updateField('sleep', sleep.split(' ')[0].toLowerCase())}
                                                className={cn(
                                                    "w-full p-4 rounded-2xl border-2 text-left font-semibold transition-all flex justify-between items-center",
                                                    formData.sleep === sleep.split(' ')[0].toLowerCase()
                                                        ? "border-primary bg-primary/10 text-primary"
                                                        : "border-border hover:border-primary/50"
                                                )}
                                            >
                                                {sleep}
                                                {formData.sleep === sleep.split(' ')[0].toLowerCase() && <Check className="w-5 h-5 text-primary" />}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* 12. BODY ANALYSIS (Placeholder) */}
                                {currentStep === 11 && (
                                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-3xl p-8 space-y-4">
                                        <Upload className="w-12 h-12 text-muted-foreground" />
                                        <div className="text-center">
                                            <p className="font-semibold">Upload a photo (Optional)</p>
                                            <p className="text-xs text-muted-foreground mt-1">Our AI can analyze your body type for better suggestions.</p>
                                        </div>
                                        <Button variant="outline" className="rounded-full">Choose Photo</Button>
                                    </div>
                                )}

                                {/* 13. AI INPUT */}
                                {currentStep === 12 && (
                                    <div className="space-y-4">
                                        <div className="relative">
                                            <Textarea
                                                placeholder="E.g., I have a home gym with dumbbells, I hate broccoli..."
                                                className="min-h-[150px] rounded-2xl resize-none p-4 text-lg"
                                                value={formData.aiInput}
                                                onChange={(e) => updateField('aiInput', e.target.value)}
                                            />
                                            <Button
                                                size="icon"
                                                className="absolute bottom-4 right-4 rounded-full h-10 w-10 shadow-md"
                                            >
                                                <Mic className="w-5 h-5" />
                                            </Button>
                                        </div>
                                        <p className="text-xs text-center text-muted-foreground">
                                            Use voice or text to tell your coach anything specific.
                                        </p>
                                    </div>
                                )}

                            </div>
                        </motion.div>
                    </AnimatePresence>
                </CardContent>

                <div className="mt-8 space-y-4">
                    <Button
                        onClick={handleNext}
                        className="w-full h-14 text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition-all"
                    >
                        {currentStep === totalSteps - 1 ? 'Start My Journey' : 'Continue'}
                        {currentStep < totalSteps - 1 && <ChevronRight className="ml-2 w-5 h-5" />}
                    </Button>

                    {currentStep > 0 && (
                        <Button
                            variant="ghost"
                            onClick={handleBack}
                            className="w-full text-muted-foreground hover:text-foreground"
                        >
                            Back
                        </Button>
                    )}
                </div>
            </Card>
        </div>
    )
}
