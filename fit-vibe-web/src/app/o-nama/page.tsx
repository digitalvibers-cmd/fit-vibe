import { Navbar } from "@/components/layout/Navbar";
import { Users, Target, Zap } from "lucide-react";

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

            <footer className="py-12 border-t bg-background mt-auto">
                <div className="container px-4 md:px-6 mx-auto text-center">
                    <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Fit Vibe. Sva prava zadržana.</p>
                </div>
            </footer>
        </div>
    );
}
