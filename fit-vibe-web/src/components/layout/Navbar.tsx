"use client"

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Dumbbell, LogOut } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { signOut } from '@/app/auth/actions';
import { useEffect, useState } from 'react';

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 mx-auto max-w-7xl">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Dumbbell className="h-6 w-6 text-primary" />
          <span>Fit Vibe</span>
        </Link>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <form action={signOut}>
                <button type="submit" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors hidden sm:flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  Odjavi se
                </button>
              </form>
              <Link href="/dashboard">
                <Button>Moj nalog</Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors hidden sm:block">
                Prijavi se
              </Link>
              <Link href="/register">
                <Button>Započni besplatno</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
