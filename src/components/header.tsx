'use client';

import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const Logo = () => (
    <Link href="/" className="flex items-center gap-1">
        <Avatar className="h-9 w-9">
            <AvatarImage src="/logo2.png" alt="@desbanx profile picture" />
            <AvatarFallback>DX</AvatarFallback>
        </Avatar>
        <span className="font-semibold text-lg text-foreground">@desbanx</span>
    </Link>
);


export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/50 backdrop-blur-lg">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-2">
            <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </div>
            <span className="text-sm text-muted-foreground">37 usuários ativos</span>
        </div>
      </div>
    </header>
  );
}
