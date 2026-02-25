import { Navbar } from "@/components/layout/Navbar";

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

            <footer className="py-12 border-t bg-background mt-auto">
                <div className="container px-4 md:px-6 mx-auto text-center">
                    <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Fit Vibe. Sva prava zadržana.</p>
                </div>
            </footer>
        </div>
    );
}
