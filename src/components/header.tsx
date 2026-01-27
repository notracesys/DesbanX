'use client';

import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useState, useEffect } from 'react';

const Logo = () => (
    <Link href="/" className="flex items-center gap-1">
        <Avatar className="h-9 w-9">
            <AvatarImage src="/logo2.jpg" alt="@desbanx profile picture" />
            <AvatarFallback>DX</AvatarFallback>
        </Avatar>
        <span className="font-semibold text-lg text-foreground">@desbanx</span>
    </Link>
);


export default function Header() {
  const [activeUsers, setActiveUsers] = useState(37);

  useEffect(() => {
    // Start with an initial random number
    setActiveUsers(Math.floor(Math.random() * (50 - 30 + 1)) + 30);

    const interval = setInterval(() => {
      setActiveUsers(prevUsers => {
        // Fluctuate by -2, -1, 0, 1, or 2
        const change = Math.floor(Math.random() * 5) - 2;
        let newCount = prevUsers + change;
        // Keep it within a realistic range
        if (newCount < 25) newCount = 25;
        if (newCount > 55) newCount = 55;
        return newCount;
      });
    }, 3500); // Update every 3.5 seconds

    // Clear interval on unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array to run only once

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/50 backdrop-blur-lg">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-2">
            <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </div>
            <span className="text-sm text-muted-foreground">{activeUsers} usuários ativos</span>
        </div>
      </div>
    </header>
  );
}
