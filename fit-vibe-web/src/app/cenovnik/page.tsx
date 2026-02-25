import { Navbar } from "@/components/layout/Navbar";
import { CheckCircle2, Activity } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
    title: "Cenovnik | Fit Vibe",
    description: "Cenovnik za pristup Fit Vibe platformi.",
};

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col font-sans selection:bg-primary/30">
            <Navbar />

            <main className="flex-1 py-24 md:py-32">
                <div className="container px-4 md:px-6 mx-auto max-w-7xl">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Cenovnik</h1>
                        <p className="text-xl text-muted-foreground">
                            Prosto, transparentno i pristupačno. Izaberi plan koji ti najviše odgovara.
                        </p>
                    </div>

                    <div className="max-w-xl mx-auto">
                        {/* Free Plan */}
                        <div className="bg-card rounded-3xl p-8 border border-border flex flex-col items-center text-center shadow-[0_0_50px_rgba(var(--primary),0.1)] relative overflow-hidden">
                            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 rounded-full bg-primary/10 blur-2xl z-0" />
                            <div className="relative z-10 w-full flex flex-col items-center">
                                <h3 className="text-2xl font-bold mb-2">Besplatno izdanje</h3>
                                <p className="text-muted-foreground mb-6">Savršeno za početak i isprobavanje opcija.</p>
                                <div className="text-5xl font-extrabold text-primary mb-8">0 RSD<span className="text-xl font-normal text-muted-foreground">/mesečno</span></div>

                                <ul className="space-y-4 mb-8 text-left w-full max-w-sm">
                                    {['Osnovni plan treninga', 'Pristup bazi zdravih obroka', 'Ručno praćenje napretka', 'Veštačka inteligencija bez limita'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                                            <span className="text-foreground/80 font-medium">{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link href="/register" className="w-full mt-4">
                                    <Button className="w-full text-lg h-12 rounded-full" size="lg">Isprobaj besplatno</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="pt-16 pb-8 border-t bg-secondary/20 mt-auto">
                <div className="container px-4 md:px-6 mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                        <div className="md:col-span-2 space-y-4">
                            <h3 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                                <Activity className="h-6 w-6 text-primary" />
                                Fit Vibe
                            </h3>
                            <p className="text-muted-foreground max-w-sm">
                                Tvoj digitalni partner za ostvarivanje vrhunskih fitnes ciljeva kroz moć veštačke inteligencije.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-bold mb-4">Platforma</h4>
                            <ul className="space-y-3">
                                <li><Link href="/opcije" className="text-muted-foreground hover:text-primary transition-colors">Opcije</Link></li>
                                <li><Link href="/cenovnik" className="text-muted-foreground hover:text-primary transition-colors">Cenovnik</Link></li>
                                <li><Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">Česta Pitanja</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold mb-4">Kompanija</h4>
                            <ul className="space-y-3">
                                <li><Link href="/o-nama" className="text-muted-foreground hover:text-primary transition-colors">O Nama</Link></li>
                                <li><Link href="/uslovi-koriscenja" className="text-muted-foreground hover:text-primary transition-colors">Uslovi Korišćenja</Link></li>
                                <li><Link href="/politika-privatnosti" className="text-muted-foreground hover:text-primary transition-colors">Politika Privatnosti</Link></li>
                                <li><Link href="/kontakt" className="text-muted-foreground hover:text-primary transition-colors">Kontakt</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-muted-foreground">
                            © {new Date().getFullYear()} Fit Vibe. Sva prava zadržana.
                        </p>
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                                <span>in</span>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                                <span>fb</span>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                                <span>ig</span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
