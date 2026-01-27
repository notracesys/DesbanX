'use client';

import Link from 'next/link';

const Logo = () => (
    <Link href="/" className="flex items-center">
        <h1 className="text-2xl font-bold tracking-tighter text-primary">
            UNBAN STRATEGY
        </h1>
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
