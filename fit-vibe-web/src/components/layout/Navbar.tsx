
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Dumbbell } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 mx-auto max-w-7xl">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Dumbbell className="h-6 w-6 text-primary" />
          <span>Fit Vibe</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 mr-6">
          <Link href="/opcije" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Opcije</Link>
          <Link href="/cenovnik" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Cenovnik</Link>
          <Link href="/faq" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Česta pitanja</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors hidden sm:block">
            Prijavi se
          </Link>
          <Link href="/register">
            <Button>Započni besplatno</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
