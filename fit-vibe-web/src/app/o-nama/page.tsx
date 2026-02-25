import { Navbar } from "@/components/layout/Navbar";
import { Users, Target, Zap, Activity } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "O nama | Fit Vibe",
    description: "Upoznajte Fit Vibe tim i našu misiju.",
};

export default function AboutUsPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col font-sans selection:bg-primary/30">
            <Navbar />

            <main className="flex-1 py-24 md:py-32">
                <div className="container px-4 md:px-6 mx-auto max-w-4xl">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">O nama</h1>
                        <p className="text-xl text-muted-foreground">
                            Mi smo Fit Vibe tim - posvećeni unapređenju vašeg zdravlja kroz tehnologiju.
                        </p>
                    </div>

                    <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground mb-16">
                        <p className="leading-relaxed mb-6">
                            Dobrodošli u Fit Vibe! Mi smo strastveni tim fitnes entuzijasta, nutricionista i inženjera posvećenih stvaranju inovativnih rešenja za poboljšanje vašeg zdravlja i kondicije. Naša misija je jednostavna: Želimo da svima omogućimo pristup personalizovanim i efikasnim planovima ishrane i treninga, uz podršku najsavremenije veštačke inteligencije.
                        </p>
                        <p className="leading-relaxed mb-6">
                            Verujemo da putovanje ka boljem zdravlju ne mora biti komplikovano niti konfuzno. Zato smo kreirali platformu koja razume vaše jedinstvene potrebe i ciljeve, eliminišući potrebu za nagađanjem i višesatnim istraživanjem. Od personalizovanih obroka do isplaniranih sesija u teretani ili kod kuće, Fit Vibe je vaš lični asistent za wellness.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 text-center mt-16">
                        <div className="bg-card p-6 rounded-3xl border border-border shadow-sm flex flex-col items-center">
                            <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                                <Target className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Naša Vizija</h3>
                            <p className="text-muted-foreground text-sm">Prilagodljiv i dugoročno održiv pristup zdravlju za svaku osobu, bez obzira na njeno trenutno stanje.</p>
                        </div>

                        <div className="bg-card p-6 rounded-3xl border border-border shadow-sm flex flex-col items-center">
                            <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                                <Zap className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Naš Pristup</h3>
                            <p className="text-muted-foreground text-sm">Korišćenje najmodernije AI tehnologije kako bismo napravili planove koji daju rezultate.</p>
                        </div>

                        <div className="bg-card p-6 rounded-3xl border border-border shadow-sm flex flex-col items-center">
                            <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                                <Users className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Naša Zajednica</h3>
                            <p className="text-muted-foreground text-sm">Podrška i bezbedan prostor za sve naše korisnike da dele svoja iskustva i uspehe.</p>
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
