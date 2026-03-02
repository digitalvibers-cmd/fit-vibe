"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
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

const STEPS = [
    { id: 'goal', title: 'Koji je tvoj fitnes cilj?' },
    { id: 'gender', title: 'Kog ste pola?' },
    { id: 'age', title: 'Koliko imate godina?' },
    { id: 'height', title: 'Koliko ste visoki?' },
    { id: 'weight', title: 'Kolika je vaša trenutna težina?' },
    { id: 'experience', title: 'Kakvo je vaše fitnes iskustvo?' },
    { id: 'injuries', title: 'Imate li neke povrede?' },
    { id: 'diet', title: 'Da li pratite poseban režim ishrane?' },
    { id: 'commitment', title: 'Koliko dana nedeljno planirate da trenirate?' },
    { id: 'planDuration', title: 'Na koliko dana želite da vam napravimo plan?' },
    { id: 'training_location', title: 'Gde preferirate da trenirate?' },
    { id: 'training_equipment', title: 'Koju opremu imate na raspolaganju?' },
    { id: 'supplements', title: 'Da li koristite suplemente?' },
    { id: 'sleep', title: 'Kakav vam je kvalitet sna?' },
    { id: 'photo', title: 'Analiza tela (Opciono)' },
    { id: 'ai_input', title: 'Još nešto za vašeg AI trenera?' },
]

export default function OnboardingWizard() {
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState(0)
    const [formData, setFormData] = useState({
        goal: '',
        gender: 'male' as 'male' | 'female' | 'other',
        age: 25,
        height: 175,
        currentWeight: 75,
        targetWeight: 70,
        experience: 'beginner',
        injuries: [] as string[],
        diet: 'classic',
        commitment: 3,
        planDuration: 7,
        trainingLocation: 'gym',
        trainingEquipment: [] as string[],
        activityLevel: 'moderate',
        supplements: [] as string[],
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
            const toastId = toast.loading('Kreiramo tvoj personalizovani plan...')
            try {
                const result = await submitOnboarding(formData)
                if (result?.error) {
                    toast.error('Greška pri kreiranju profila.', { id: toastId })
                } else {
                    toast.success('Dobrodošli u Fit Vibe! 🎉', { id: toastId })
                    router.push('/dashboard')
                }
            } catch (error) {
                toast.error('Došlo je do greške.', { id: toastId })
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
                    <span>Upitnik</span>
                    <span>{currentStep + 1} od {totalSteps}</span>
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
                                        {[
                                            { label: 'Smršati', value: 'Lose weight' },
                                            { label: 'Povećati mišićnu masu', value: 'Gain muscle' },
                                            { label: 'Poboljšati kondiciju', value: 'Endurance' },
                                            { label: 'Održati formu', value: 'Keep fit' }
                                        ].map((g) => (
                                            <button
                                                key={g.value}
                                                onClick={() => updateField('goal', g.value)}
                                                className={cn(
                                                    "w-full p-4 rounded-2xl border-2 text-left font-semibold transition-all flex justify-between items-center",
                                                    formData.goal === g.value
                                                        ? "border-primary bg-primary/10 text-primary"
                                                        : "border-border hover:border-primary/50"
                                                )}
                                            >
                                                {g.label}
                                                {formData.goal === g.value && <Check className="w-5 h-5 text-primary" />}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* 2. GENDER */}
                                {currentStep === 1 && (
                                    <div className="grid grid-cols-1 gap-4">
                                        {[
                                            { label: 'Muški', value: 'male' },
                                            { label: 'Ženski', value: 'female' }
                                        ].map((g) => (
                                            <button
                                                key={g.value}
                                                onClick={() => updateField('gender', g.value)}
                                                className={cn(
                                                    "h-32 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all",
                                                    formData.gender === g.value
                                                        ? "border-primary bg-primary/10 text-primary"
                                                        : "border-border hover:border-primary/50"
                                                )}
                                            >
                                                <span className="text-lg font-bold capitalize">{g.label}</span>
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
                                            <Label className="text-center block">Trenutna težina</Label>
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
                                            <Label className="text-center block">Ciljana težina</Label>
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
                                        {[
                                            { label: 'Početnik', value: 'beginner' },
                                            { label: 'Srednje iskusni trener', value: 'intermediate' },
                                            { label: 'Napredni trener', value: 'advanced' }
                                        ].map((e) => (
                                            <button
                                                key={e.value}
                                                onClick={() => updateField('experience', e.value)}
                                                className={cn(
                                                    "w-full p-4 rounded-2xl border-2 text-left font-semibold transition-all flex justify-between items-center",
                                                    formData.experience === e.value
                                                        ? "border-primary bg-primary/10 text-primary"
                                                        : "border-border hover:border-primary/50"
                                                )}
                                            >
                                                {e.label}
                                                {formData.experience === e.value && <Check className="w-5 h-5 text-primary" />}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* 7. INJURIES */}
                                {currentStep === 6 && (
                                    <div className="space-y-3">
                                        <p className="text-sm text-center text-muted-foreground mb-4">Izaberite sve što se odnosi na vas</p>
                                        {[
                                            { label: 'Nemam povrede', value: 'none' },
                                            { label: 'Bol u leđima', value: 'back_pain' },
                                            { label: 'Bol u kolenima', value: 'knee_pain' },
                                            { label: 'Bol u ramenima', value: 'shoulder_pain' }
                                        ].map((injury) => (
                                            <button
                                                key={injury.value}
                                                onClick={() => {
                                                    if (injury.value === 'none') updateField('injuries', [])
                                                    else toggleArrayItem('injuries', injury.value)
                                                }}
                                                className={cn(
                                                    "w-full p-4 rounded-2xl border-2 text-left font-semibold transition-all flex justify-between items-center",
                                                    (injury.value === 'none' && formData.injuries.length === 0) || (formData.injuries as string[]).includes(injury.value)
                                                        ? "border-primary bg-primary/10 text-primary"
                                                        : "border-border hover:border-primary/50"
                                                )}
                                            >
                                                {injury.label}
                                                {((injury.value === 'none' && formData.injuries.length === 0) || (formData.injuries as string[]).includes(injury.value)) && <Check className="w-5 h-5 text-primary" />}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* 8. DIET */}
                                {currentStep === 7 && (
                                    <div className="grid grid-cols-2 gap-3">
                                        {[
                                            { label: 'Klasična', value: 'classic' },
                                            { label: 'Keto', value: 'keto' },
                                            { label: 'Veganska', value: 'vegan' },
                                            { label: 'Paleo', value: 'paleo' }
                                        ].map((diet) => (
                                            <button
                                                key={diet.value}
                                                onClick={() => updateField('diet', diet.value)}
                                                className={cn(
                                                    "aspect-square rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all p-2 text-center",
                                                    formData.diet === diet.value
                                                        ? "border-primary bg-primary/10 text-primary"
                                                        : "border-border hover:border-primary/50"
                                                )}
                                            >
                                                <span className="font-bold">{diet.label}</span>
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
                                        <p className="text-muted-foreground">dana nedeljno</p>
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

                                {/* 10. PLAN DURATION */}
                                {currentStep === 9 && (
                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            { label: '7 Dana', value: 7 },
                                            { label: '14 Dana', value: 14 },
                                            { label: '21 Dan', value: 21 },
                                            { label: '30 Dana', value: 30 }
                                        ].map((dur) => (
                                            <button
                                                key={dur.value}
                                                onClick={() => updateField('planDuration', dur.value)}
                                                className={cn(
                                                    "h-32 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all",
                                                    formData.planDuration === dur.value
                                                        ? "border-primary bg-primary/10 text-primary"
                                                        : "border-border hover:border-primary/50"
                                                )}
                                            >
                                                <span className="text-2xl font-bold">{dur.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* 11. TRAINING LOCATION */}
                                {currentStep === 10 && (
                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            { label: 'Teretana', value: 'gym' },
                                            { label: 'Kod kuće', value: 'home' }
                                        ].map((loc) => (
                                            <button
                                                key={loc.value}
                                                onClick={() => updateField('trainingLocation', loc.value)}
                                                className={cn(
                                                    "h-32 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all",
                                                    formData.trainingLocation === loc.value
                                                        ? "border-primary bg-primary/10 text-primary"
                                                        : "border-border hover:border-primary/50"
                                                )}
                                            >
                                                <span className="text-lg font-bold">{loc.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* 12. TRAINING EQUIPMENT */}
                                {currentStep === 11 && (
                                    <div className="space-y-4">
                                        {formData.trainingLocation === 'gym' ? (
                                            <div className="text-center space-y-4">
                                                <p className="text-muted-foreground">S obzirom da trenirate u teretani, podrazumevamo da imate pristup standardnoj opremi.</p>
                                                <Check className="w-12 h-12 text-primary mx-auto" />
                                            </div>
                                        ) : (
                                            <>
                                                <div className="grid grid-cols-2 gap-3">
                                                    {[
                                                        { label: 'Bučice', value: 'dumbbells' },
                                                        { label: 'Šipka', value: 'barbell' },
                                                        { label: 'Trake', value: 'bands' },
                                                        { label: 'Rusko zvono', value: 'kettlebell' },
                                                        { label: 'Klupa', value: 'bench' },
                                                        { label: 'Vratilo', value: 'pullup_bar' }
                                                    ].map((eq) => (
                                                        <button
                                                            key={eq.value}
                                                            onClick={() => toggleArrayItem('trainingEquipment', eq.value)}
                                                            className={cn(
                                                                "h-24 rounded-2xl border-2 flex items-center justify-center p-2 text-center text-sm font-semibold transition-all",
                                                                (formData.trainingEquipment as string[]).includes(eq.value)
                                                                    ? "border-primary bg-primary/10 text-primary"
                                                                    : "border-border hover:border-primary/50"
                                                            )}
                                                        >
                                                            {eq.label}
                                                        </button>
                                                    ))}
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    onClick={() => updateField('trainingEquipment', [])}
                                                    className="w-full text-muted-foreground"
                                                >
                                                    Koristim samo telesnu težinu
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                )}

                                {/* 13. SUPPLEMENTS */}
                                {currentStep === 12 && (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-3">
                                            {[
                                                { label: 'Whey Protein', value: 'whey' },
                                                { label: 'Kreatin', value: 'creatine' },
                                                { label: 'Vitamini', value: 'vitamins' },
                                                { label: 'BCAA', value: 'bcaas' }
                                            ].map((supp) => (
                                                <button
                                                    key={supp.value}
                                                    onClick={() => toggleArrayItem('supplements', supp.value)}
                                                    className={cn(
                                                        "h-24 rounded-2xl border-2 flex items-center justify-center p-2 text-center text-sm font-semibold transition-all",
                                                        (formData.supplements as string[]).includes(supp.value)
                                                            ? "border-primary bg-primary/10 text-primary"
                                                            : "border-border hover:border-primary/50"
                                                    )}
                                                >
                                                    {supp.label}
                                                </button>
                                            ))}
                                        </div>
                                        <Button
                                            variant="ghost"
                                            onClick={() => updateField('supplements', [])}
                                            className="w-full text-muted-foreground"
                                        >
                                            Ne koristim specifične suplemente
                                        </Button>
                                    </div>
                                )}

                                {/* 14. SLEEP */}
                                {currentStep === 13 && (
                                    <div className="space-y-3">
                                        {[
                                            { label: 'Odličan (>8h)', value: 'excellent' },
                                            { label: 'Dobar (7-8h)', value: 'good' },
                                            { label: 'Prosečan (6-7h)', value: 'fair' },
                                            { label: 'Loš (<6h)', value: 'poor' }
                                        ].map((sleep) => (
                                            <button
                                                key={sleep.value}
                                                onClick={() => updateField('sleep', sleep.value)}
                                                className={cn(
                                                    "w-full p-4 rounded-2xl border-2 text-left font-semibold transition-all flex justify-between items-center",
                                                    formData.sleep === sleep.value
                                                        ? "border-primary bg-primary/10 text-primary"
                                                        : "border-border hover:border-primary/50"
                                                )}
                                            >
                                                {sleep.label}
                                                {formData.sleep === sleep.value && <Check className="w-5 h-5 text-primary" />}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* 15. BODY ANALYSIS (Placeholder) */}
                                {currentStep === 14 && (
                                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-3xl p-8 space-y-4">
                                        <Upload className="w-12 h-12 text-muted-foreground" />
                                        <div className="text-center">
                                            <p className="font-semibold">Dodaj fotografiju (Opciono)</p>
                                            <p className="text-xs text-muted-foreground mt-1">Naš AI može analizirati vaš tip tela za bolje sugestije.</p>
                                        </div>
                                        <Button variant="outline" className="rounded-full">Izaberi fotografiju</Button>
                                    </div>
                                )}

                                {/* 16. AI INPUT */}
                                {currentStep === 15 && (
                                    <div className="space-y-4">
                                        <div className="relative">
                                            <Textarea
                                                placeholder="Npr. imam kućnu teretanu sa bučicama, mrzim brokoli..."
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
                                            Koristite glas ili tekstualnu poruku da kažete vašem treneru bilo šta specifično.
                                        </p>
                                    </div>
                                )}

                            </div>
                        </motion.div>
                    </AnimatePresence>
                </CardContent>

                <div className="mt-8 space-y-4 w-full max-w-md">
                    <Button
                        onClick={handleNext}
                        className="w-full h-14 text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition-all"
                    >
                        {currentStep === totalSteps - 1 ? 'Započni moje putovanje' : 'Nastavi'}
                        {currentStep < totalSteps - 1 && <ChevronRight className="ml-2 w-5 h-5" />}
                    </Button>

                    {currentStep > 0 && (
                        <Button
                            variant="ghost"
                            onClick={handleBack}
                            className="w-full text-muted-foreground hover:text-foreground"
                        >
                            Nazad
                        </Button>
                    )}
                </div>
            </Card>
        </div>
    )
}
