import { Navbar } from "@/components/layout/Navbar";
import { Mail, Send, Activity } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
    title: "Kontakt | Fit Vibe",
    description: "Kontaktirajte Fit Vibe tim.",
};

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col font-sans selection:bg-primary/30">
            <Navbar />

            <main className="flex-1 py-24 md:py-32 relative overflow-hidden">
                {/* Background blobs */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl z-0" />

                <div className="container px-4 md:px-6 mx-auto max-w-5xl relative z-10">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Stupi u kontakt</h1>
                        <p className="text-xl text-muted-foreground">
                            Imaš pitanje, predlog ili problem? Piši nam i naš tim će ti odgovoriti u najkraćem roku.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <div className="flex flex-col justify-center space-y-8">
                            <div className="bg-card rounded-3xl p-8 border border-border shadow-sm flex flex-col items-center text-center">
                                <div className="h-16 w-16 bg-primary/10 rounded-full flex justify-center items-center mb-6">
                                    <Mail className="h-8 w-8 text-primary" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Piši nam direkto</h3>
                                <p className="text-muted-foreground mb-6">Naša korisnička podrška je tu za tebe radnim danima od 09h do 17h.</p>
                                <a href="mailto:office@digitalvibe.rs" className="text-2xl font-semibold text-primary hover:underline">
                                    office@digitalvibe.rs
                                </a>
                            </div>
                        </div>

                        {/* Simple Contact Form */}
                        <div className="bg-card rounded-3xl p-8 lg:p-10 border border-border shadow-md">
                            <h3 className="text-2xl font-bold mb-6">Pošalji nam poruku</h3>
                            <form action="mailto:office@digitalvibe.rs" method="post" encType="text/plain" className="space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Tvoje Ime</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Unesi svoje ime"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email Adresa</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="tvoj@email.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Poruka</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={4}
                                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Kako možemo da ti pomognemo?"
                                    />
                                </div>
                                <Button type="submit" className="w-full mt-4">
                                    Pošalji <Send className="ml-2 h-4 w-4" />
                                </Button>
                                <p className="text-xs text-muted-foreground text-center mt-4">
                                    * Klikom na dugme otvoriće se vaš podrazumevani email klijent.
                                </p>
                            </form>
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
