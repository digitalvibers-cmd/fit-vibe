import { Navbar } from "@/components/layout/Navbar";
import { Activity } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Politika Privatnosti | Fit Vibe",
    description: "Politika privatnosti i obrada podataka za Fit Vibe.",
};

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col font-sans selection:bg-primary/30">
            <Navbar />

            <main className="flex-1 py-24 md:py-32">
                <div className="container px-4 md:px-6 mx-auto max-w-4xl">
                    <div className="mb-12 border-b pb-8">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Politika Privatnosti</h1>
                        <p className="text-sm text-muted-foreground">Poslednje ažuriranje: {new Date().toLocaleDateString('sr-RS')}</p>
                    </div>

                    <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/80 space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">1. Uvod</h2>
                            <p>
                                U Fit Vibe posvećeni smo zaštiti vaše privatnosti i vaših ličnih podataka. U ovoj Politici privatnosti objasnićemo koje podatke prikupljamo, zašto ih prikupljamo i vaša prava vezano za iste. Korišćenjem naše platforme smatramo da se slažete sa dole navedenom politikom.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">2. Podaci koje prikupljamo</h2>
                            <p>
                                Za funkcionisanje našeg servisa neophodno je da prikupimo određene podatke o Vama:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Osnovni kontakt podaci:</strong> Ime, prezime i email adresa.</li>
                                <li><strong>Fizičke karakteristike:</strong> Visina, težina, životna dob i pol iz kojih se, po vašem izboru, kreiraju parametri treninga.</li>
                                <li><strong>Aktivnost i zdravlje:</strong> Informacije o vašim fitnes ciljevima, preferencijama za ishranu i istoriji rezultata korišćenja aplikacije.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">3. Kako koristimo podatke</h2>
                            <p>Vaši podaci se isključivo koriste radi pružanja i optimizacije usluge:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li>Da bismo vam ponudili potpuno personalizovane planove treninga i ishrane preko naše AI tehnologije.</li>
                                <li>Za kreiranje vašeg korisničkog naloga i rešavanje potencijalnih tehničkih problema (podrška korisnicima).</li>
                                <li>Za analizu anonimizovanih trendova koje pomažu u daljem unapređenju Fit Vibe platforme.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">4. Zaštita Podataka</h2>
                            <p>
                                Fit Vibe koristi savremene mere zaštite i SSL enkripciju kako bismo obezbedili sigurnost vaših ličnih informacija. Ne prodajemo i ne delimo sa trećim licima vaše zdravstvene i lične podatke u komercijalne svrhe, već se isti obrađuju bezbedno i ostaju poznati samo Vama.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">5. Vaša Prava</h2>
                            <p>
                                Imate pravo da u svakom trenutku pregledate informacije kojima raspolažemo, promenite ih kroz Vaš profil u sekciji "Podešavanja", i zahtevate brisanje naloga. Kontaktirajte nas putem e-maila <strong>office@digitalvibe.rs</strong> za trajno uklanjanje svih podataka sa naših servera.
                            </p>
                        </section>
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
