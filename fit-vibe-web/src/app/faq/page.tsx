import { Navbar } from "@/components/layout/Navbar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Activity } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
    title: "Česta Pitanja | Fit Vibe",
    description: "Odgovori na najčešća pitanja o Fit Vibe aplikaciji.",
};

export default function FAQPage() {
    const faqs = [
        {
            question: "Da li je Fit Vibe aplikacija besplatna?",
            answer: "Fit Vibe nudi besplatan osnovni plan koji uključuje ograničen pristup treninzima i obrocima. Za potpuni pristup personalizovanim planovima ishrane i naprednim treninzima, nudimo Premium pretplatu."
        },
        {
            question: "Kako funkcioniše AI kreiranje treninga?",
            answer: "Prilikom registracije, popunjavate upitnik o svojim ciljevima, trenutnoj formi i opremi koju imate (čak i ako nemate opremu). Naš AI algoritam analizira ove podatke i generiše optimalan plan treninga samo za vas."
        },
        {
            question: "Šta ako imam posebne zahteve za ishranu?",
            answer: "Trenutno, aplikacija podržava brojne standardne ciljeve poput mršavljenja i dobijanja mišićne mase. Uskoro uvodimo i napredne filtere za različite vrste ishrane (veganska, bez glutena itd.)."
        },
        {
            question: "Na kojim uređajima radi aplikacija?",
            answer: "Fit Vibe je web aplikacija optimizovana za sve moderne pregledače na mobilnim telefonima, tabletima i desktop računarima."
        },
        {
            question: "Mogu li da otkažem pretplatu u bilo kom trenutku?",
            answer: "Da, Premium pretplatu možete otkazati kada god želite preko podešavanja vašeg profila, bez ikakvih skrivenih troškova."
        }
    ];

    return (
        <div className="min-h-screen bg-background flex flex-col font-sans selection:bg-primary/30">
            <Navbar />

            <main className="flex-1 py-24 md:py-32">
                <div className="container px-4 md:px-6 mx-auto max-w-4xl">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Česta Pitanja</h1>
                        <p className="text-xl text-muted-foreground">
                            Sve što te zanima o funkcionisanju naše aplikacije.
                        </p>
                    </div>

                    <div className="bg-card rounded-3xl p-8 border border-border shadow-sm mb-16">
                        <Accordion type="single" collapsible className="w-full">
                            {faqs.map((faq, index) => (
                                <AccordionItem key={index} value={`item-${index}`}>
                                    <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary transition-colors">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground text-base">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>

                    <div className="text-center">
                        <p className="text-lg text-foreground mb-6">Nisi pronašao/la odgovor koji tražiš?</p>
                        <Link href="/kontakt">
                            <Button size="lg">Kontaktiraj nas</Button>
                        </Link>
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
