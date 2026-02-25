import { Navbar } from "@/components/layout/Navbar";
import { CheckCircle2 } from "lucide-react";
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

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Free Plan */}
                        <div className="bg-card rounded-3xl p-8 border border-border shadow-md flex flex-col">
                            <h3 className="text-2xl font-bold mb-2">Besplatno izdanje</h3>
                            <p className="text-muted-foreground mb-6">Savršeno za početak i isprobavanje opcija.</p>
                            <div className="text-4xl font-extrabold mb-8">0 RSD<span className="text-lg font-normal text-muted-foreground">/mesečno</span></div>

                            <ul className="space-y-4 mb-8 flex-1">
                                {['Osnovni plan treninga', 'Pristup bazi zdravih obroka', 'Ručno praćenje napretka'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                                        <span className="text-foreground/80 font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link href="/register" className="w-full">
                                <Button className="w-full" variant="outline" size="lg">Isprobaj besplatno</Button>
                            </Link>
                        </div>

                        {/* Premium Plan */}
                        <div className="bg-card rounded-3xl p-8 border-2 border-primary shadow-xl relative flex flex-col">
                            <div className="absolute top-0 right-8 transform -translate-y-1/2">
                                <span className="bg-primary text-white text-xs font-bold uppercase tracking-widest py-1 px-3 rounded-full">Najpopularnije</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Premium</h3>
                            <p className="text-muted-foreground mb-6">Za brže ostvarivanje tvojih fitness ciljeva.</p>
                            <div className="text-4xl font-extrabold mb-8">990 RSD<span className="text-lg font-normal text-muted-foreground">/mesečno</span></div>

                            <ul className="space-y-4 mb-8 flex-1">
                                {['Napredni AI personalizovani treninzi', 'Detaljan nedeljni plan ishrane', 'Automatsko detaljno praćenje napretka', 'Prioritetna podrška korisnicima', 'Pristup svim budućim funkcionalnostima'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                                        <span className="text-foreground/80 font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link href="/register" className="w-full">
                                <Button className="w-full" size="lg">Zapocni sada</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="py-12 border-t bg-background mt-auto">
                <div className="container px-4 md:px-6 mx-auto text-center">
                    <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Fit Vibe. Sva prava zadržana.</p>
                </div>
            </footer>
        </div>
    );
}
