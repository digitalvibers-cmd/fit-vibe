import { Navbar } from "@/components/layout/Navbar";

export const metadata = {
    title: "Uslovi Korišćenja | Fit Vibe",
    description: "Uslovi korišćenja usluga platforme Fit Vibe.",
};

export default function TermsOfServicePage() {
    return (
        <div className="min-h-screen bg-background flex flex-col font-sans selection:bg-primary/30">
            <Navbar />

            <main className="flex-1 py-24 md:py-32">
                <div className="container px-4 md:px-6 mx-auto max-w-4xl">
                    <div className="mb-12 border-b pb-8">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Uslovi Korišćenja</h1>
                        <p className="text-sm text-muted-foreground">Poslednje ažuriranje: {new Date().toLocaleDateString('sr-RS')}</p>
                    </div>

                    <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/80 space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">1. Uvod</h2>
                            <p>
                                Dobrodošli na platformu Fit Vibe. Pristupanjem i korišćenjem naših usluga, aplikacija i sajta, saglasni ste da ćete poštovati sledeće uslove korišćenja. Molimo Vas da pažljivo pročitate ovaj ugovor pre nego što započnete sa korišćenjem platforme.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">2. Prihvatanje Uslova</h2>
                            <p>
                                Kreiranjem naloga ili korišćenjem Fit Vibe aplikacije korisnik u potpunosti prihvata Uslove korišćenja. Ukoliko se ne slažete sa ovim uslovima, molimo vas da ne koristite naše usluge.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">3. Medicinsko Upozorenje i Odricanje Od Odgovornosti</h2>
                            <p>
                                Fit Vibe <strong>nije medicinska organizacija</strong> i rezultati naših algoritama ne predstavljaju medicinski savet, dijagnozu niti tretman. Pre otpočinjanja bilo kakvog plana ishrane ili treninga obavezno konsultujte svog izabranog lekara, posebno ukoliko bolujete od nekih bolesti ili imate zdravstvenih poteskoća. Rizik od povreda ili oštećenja zdravlja tokom vežbanja preuzimate u potpunosti na sebe.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">4. Obaveze Korisnika</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Vaša je obaveza da prilikom registracije obezbedite tačne podatke o svom trenutnom stanju.</li>
                                <li>Vaša je odgovornost čuvanje lozinke kojom pristupate aplikaciji.</li>
                                <li>Korisnicima mlađim od 18 godina potrebna je saglasnost roditelja za korišćenje servisa.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">5. Plaćanje i Pretplata</h2>
                            <p>
                                Pojedini delovi naših usluga zahtevaju aktivnu Premium pretplatu. Fit Vibe zadržava pravo da promeni politiku cena u bilo kom trenutku uz prethodno obaveštenje. Otkazivanje pretplate je moguće u svakom trenutku bez penala, ali uplaćena sredstva za tekući obračunski period se ne refundiraju.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-foreground mb-4">6. Kontakt</h2>
                            <p>
                                Zadržavamo pravo da povremeno bez prethodne najave menjamo ovaj dokument. Za sva pitanja u vezi Uslova Korišćenja budite slobodni da nas kontaktirate na email: <strong>office@digitalvibe.rs</strong>
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
