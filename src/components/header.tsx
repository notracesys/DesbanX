
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, Home, ShieldCheck } from 'lucide-react';

const Logo = () => (
    <Link href="/" className="flex items-center gap-4">
        <Image src="/desbanlogo.png" alt="Desban Logo" width={120} height={34} />
    </Link>
);

const NavLinks = () => (
  <nav className="flex flex-col gap-4 mt-8">
    <Link href="/" className="flex items-center gap-3 text-lg font-medium p-2 rounded-md hover:bg-muted">
      <Home className="h-5 w-5" />
      Início
    </Link>
    <Link href="/verify" className="flex items-center gap-3 text-lg font-medium p-2 rounded-md hover:bg-muted">
      <ShieldCheck className="h-5 w-5" />
      Verificar Conta
    </Link>
  </nav>
);

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-black/50 backdrop-blur-lg">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Logo />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="hover:bg-white/10">
              <Menu className="h-6 w-6 text-white" />
              <span className="sr-only">Abrir menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-background">
            <SheetHeader>
              <SheetTitle className="sr-only">Menu Principal</SheetTitle>
            </SheetHeader>
            <div className="p-4">
              <Logo />
              <NavLinks />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
