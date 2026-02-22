"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/layout/Navbar";
import { ArrowRight, Brain, Trophy, Utensils } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="flex-1 flex flex-col justify-center items-center text-center px-4 py-24 md:py-32 bg-gradient-to-b from-background to-secondary/20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Your Personal <span className="text-primary">AI Coach</span> for Health & Fitness
          </h1>
          <p className="text-xl text-muted-foreground md:text-2xl max-w-2xl mx-auto">
            Fit Vibe uses advanced AI to create personalized workout and meal plans that adapt to your lifestyle, goals, and equipment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/register">
              <Button size="lg" className="text-lg px-8 h-12">
                Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="text-lg px-8 h-12">
                Sign In
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Why Fit Vibe?</h2>
            <p className="mt-4 text-lg text-muted-foreground">Everything you need to stay consistent and achieve your goals.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="h-full border-none shadow-lg bg-background">
                <CardHeader>
                  <Brain className="h-12 w-12 text-primary mb-4" />
                  <CardTitle className="text-xl">AI-Powered Planning</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Stop guessing what to do. Our AI analyzes your goals and constraints to generate the perfect workout and meal plan for you, every day.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="h-full border-none shadow-lg bg-background">
                <CardHeader>
                  <Utensils className="h-12 w-12 text-primary mb-4" />
                  <CardTitle className="text-xl">Personalized Nutrition</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Get meal plans that fit your dietary preferences and allergies. Easy recipes, shopping lists, and macro tracking built-in.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Card className="h-full border-none shadow-lg bg-background">
                <CardHeader>
                  <Trophy className="h-12 w-12 text-primary mb-4" />
                  <CardTitle className="text-xl">Gamified Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Join leagues, compete with others, and earn rewards. Turn your fitness journey into a fun game that keeps you motivated.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t bg-background">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Fit Vibe. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
