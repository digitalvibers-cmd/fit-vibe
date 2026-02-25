"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/layout/Navbar";
import { ArrowRight, CheckCircle2, TrendingUp, NotebookPen, Dumbbell, Apple, Heart, Activity } from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans selection:bg-primary/30">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          {/* Pexels free workout video URL */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://videos.pexels.com/video-files/3196220/3196220-uhd_2560_1440_25fps.mp4" type="video/mp4" />
          </video>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-20 max-w-4xl space-y-8 pb-16 pt-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur-md mb-4"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
            Revolucija u fitnessu
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-lg leading-tight">
            Ostvari svoju <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">formu iz snova</span>
          </h1>

          <p className="text-xl text-gray-200 md:text-2xl max-w-2xl mx-auto drop-shadow-md font-light">
            Fit Vibe koristi naprednu AI tehnologiju kako bi kreirao personalizovane planove treninga i ishrane prilagođene tebi.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
          >
            <Link href="/register">
              <Button size="lg" className="text-lg px-8 h-14 rounded-full shadow-xl shadow-primary/20 hover:scale-105 transition-transform duration-300">
                Započni besplatno <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
        >
          <span className="text-white/60 text-sm mb-2 uppercase tracking-widest">Skroluj</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-5 h-8 border-2 border-white/40 rounded-full flex justify-center pt-1"
          >
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Why Section */}
      <section className="py-24 md:py-32 bg-background relative overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />

        <div className="container px-4 md:px-6 mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">Zašto Fit Vibe</h2>
            <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Sve što ti treba za uspeh</h3>
            <p className="text-xl text-muted-foreground">
              Naša platforma je dizajnirana za ljude koji žele rezultate bez nagađanja. Mi brinemo o planiranju, ti o izvođenju.
            </p>
          </div>

          <div className="space-y-32">
            {/* Workouts Subsection */}
            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className="flex-1 space-y-6"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Dumbbell className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold">Pametni treninzi kod kuće ili u teretani</h3>
                <p className="text-lg text-muted-foreground">
                  Zaboravi na generičke programe. Naš AI algoritam kreira treninge zasnovane na tvojoj trenutnoj formi, ciljevima i opremi kojom raspolažeš.
                </p>
                <ul className="space-y-4 pt-4">
                  {['Prilagođeno tvom nivou spremnosti', 'Video instrukcije za svaku vežbu', 'Automatsko praćenje napretka'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-foreground/80 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className="flex-1 relative w-full"
              >
                <div className="relative rounded-3xl overflow-hidden aspect-[4/3] w-full shadow-2xl">
                  <Image
                    src="/images/workout-app.png"
                    alt="Osoba vežba kod kuće uz aplikaciju"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 border border-black/10 dark:border-white/10 rounded-3xl"></div>
                </div>
                {/* Floating element */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute -bottom-6 -left-6 bg-background rounded-2xl p-4 shadow-xl border border-border flex items-center gap-4"
                >
                  <div className="bg-green-500/10 p-3 rounded-full">
                    <TrendingUp className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Sagoreno</p>
                    <p className="text-xl font-bold">450 kcal</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Meals Subsection */}
            <div className="flex flex-col-reverse md:flex-row items-center gap-12 lg:gap-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className="flex-1 relative w-full"
              >
                <div className="relative rounded-3xl overflow-hidden aspect-[4/3] w-full shadow-2xl">
                  <Image
                    src="/images/meal-app.png"
                    alt="Zdrav obrok uz aplikaciju ishrane"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 border border-black/10 dark:border-white/10 rounded-3xl"></div>
                </div>
                {/* Floating element */}
                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                  className="absolute -top-6 -right-6 bg-background rounded-2xl p-4 shadow-xl border border-border flex gap-4"
                >
                  <div className="grid grid-cols-3 gap-3">
                    <div className="flex flex-col items-center">
                      <div className="h-10 w-2 bg-secondary rounded-full overflow-hidden flex justify-end flex-col">
                        <div className="w-full bg-blue-500 h-[60%] rounded-full" />
                      </div>
                      <span className="text-[10px] uppercase font-bold mt-1 text-muted-foreground">UH</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="h-10 w-2 bg-secondary rounded-full overflow-hidden flex justify-end flex-col">
                        <div className="w-full bg-primary h-[85%] rounded-full" />
                      </div>
                      <span className="text-[10px] uppercase font-bold mt-1 text-muted-foreground">Pro</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="h-10 w-2 bg-secondary rounded-full overflow-hidden flex justify-end flex-col">
                        <div className="w-full bg-orange-500 h-[40%] rounded-full" />
                      </div>
                      <span className="text-[10px] uppercase font-bold mt-1 text-muted-foreground">Masti</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className="flex-1 space-y-6"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Apple className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold">Ishrana koja zapravo funkcioniše</h3>
                <p className="text-lg text-muted-foreground">
                  Transformiši svoje telo bez gladovanja. Dobij ukusne recepte koji se savršeno uklapaju u tvoje dnevne makronutrijente i kalorijske potrebe.
                </p>
                <ul className="space-y-4 pt-4">
                  {['Nedeljni jelovnici', 'Automatske liste za kupovinu', 'Prilagođeno alergijama i željama'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-foreground/80 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="py-24 bg-secondary/30 border-y border-border/50">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl mb-4">Kako funkcioniše?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Put do savršene forme nikada nije bio jednostavniji. Tri laka koraka dele te od tvog fitnes putovanja.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-border z-0"></div>

            {[
              {
                step: "01",
                icon: <NotebookPen className="w-6 h-6" />,
                title: "Napravi profil",
                desc: "Unesi svoje trenutne mere, željene ciljeve i iskustvo."
              },
              {
                step: "02",
                icon: <Heart className="w-6 h-6" />,
                title: "Dobij AI Plan",
                desc: "Naš algoritam generiše personalizovan plan u sekundi."
              },
              {
                step: "03",
                icon: <LogoTrophy className="w-6 h-6" />,
                title: "Prati napredak",
                desc: "Beleži treninge, obroke i takmiči se sa drugima."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="relative z-10"
              >
                <Card className="h-full border-none shadow-xl bg-background hover:shadow-primary/5 transition-shadow duration-300 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-6 text-6xl font-black text-secondary/30 group-hover:text-primary/5 transition-colors duration-300">
                    {item.step}
                  </div>
                  <CardContent className="pt-10 px-8 pb-10 flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/30 mb-2">
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-bold">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Mini Section */}
      <section className="py-24 bg-background">
        <div className="container px-4 md:px-6 mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-primary/5 rounded-3xl p-10 md:p-16 border border-primary/10"
          >
            <h2 className="text-3xl font-bold mb-6">Naša Misija</h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10">
              Verujemo da je zdrav način života pravo svakot čoveka, a ne luksuz. Stvorili smo Fit Vibe spojivši vrhunsku fitnes ekspertizu i najnoviju AI tehnologiju, sa jasnim ciljem – da učinimo rezultate dostupnijim, lakšim za održavanje i zabavnijim nego ikad pre.
            </p>
            <Link href="/register">
              <Button size="lg" className="rounded-full px-8 font-bold hover:scale-105 transition-transform duration-300">
                Pridruži se Fit Vibe zajednici
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-16 pb-8 border-t bg-secondary/20">
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
              {/* Social icons placeholder */}
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

// Icon helper to avoid importing from next if not there
function LogoTrophy(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}
