'use client';

import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const Logo = () => (
    <Link href="/" className="flex items-center gap-3">
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
      </div>
    </header>
  );
}
