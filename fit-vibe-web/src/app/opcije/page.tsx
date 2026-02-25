import { Navbar } from "@/components/layout/Navbar";
import { ListChecks, LayoutGrid, CalendarCheck, FilePieChart, TrendingUp, Sparkles, Activity } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Opcije i Mogućnosti | Fit Vibe",
    description: "Sve funckionalnosti i opcije koje Fit Vibe aplikacija nudi korisnicima.",
};

export default function FeaturesPage() {
    const features = [
        {
            title: "AI Personalizovani Trening",
            description: "Generisanje jedinstvenih dnevnih trening sesija oslanjajući se isključivo na vaš nivo spremnosti i opremu u teretani ili kod kuće.",
            icon: <Sparkles className="h-6 w-6 text-primary" />
        },
        {
            title: "Nedeljni Plan Ishrane",
            description: "Zdravi i lako ostvarivi recepti koji menjaju klasične dijete, uz tačan kalkulator kalorija za mršavljenje ili mišićnu definiciju.",
            icon: <CalendarCheck className="h-6 w-6 text-primary" />
        },
        {
            title: "Praćenje Napretka",
            description: "Vizuelizujte vaše nedeljne uspehe kroz dijagrame. Pratite težinu, merenja i dnevni unos kalorija da biste ostali dosledni rezultatima.",
            icon: <TrendingUp className="h-6 w-6 text-primary" />
        },
        {
            title: "Dnevnik Obroka",
            description: "Unosite ono što ste pojeli tokom dana, prateći u realnom vremenu raspodelu makronutrijenata (protein, ugljeni hidrati, masti).",
            icon: <FilePieChart className="h-6 w-6 text-primary" />
        },
        {
            title: "Podešavanje Ciljeva",
            description: "Precizno definisanje roka i rezultata, koje platforma koristi da vam drži stepen motivacije stalno na maksimumu.",
            icon: <ListChecks className="h-6 w-6 text-primary" />
        },
        {
            title: "Organizovani Interfejs",
            description: "Minimalistička i super brza platforma sakuplja sve za fitness na jedan Dashboard koji funkcioniše i na mobilnom glatko.",
            icon: <LayoutGrid className="h-6 w-6 text-primary" />
        }
    ];

    return (
        <div className="min-h-screen bg-background flex flex-col font-sans selection:bg-primary/30">
            <Navbar />

            <main className="flex-1 py-24 md:py-32">
                <div className="container px-4 md:px-6 mx-auto max-w-6xl">
                    <div className="text-center mb-20 max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Naše Opcije</h1>
                        <p className="text-xl text-muted-foreground">
                            Ne prepuštajte slučajnosti vašu transformaciju. Otkrijte sve moćne funkcionalnosti unutar Fit Vibe aplikacije.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, i) => (
                            <div key={i} className="bg-card p-8 rounded-3xl border border-border shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-300">
                                <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
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
