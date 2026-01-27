'use client';

import Header from '@/components/header';
import Landing from '@/components/landing';
import ParticleBackground from '@/components/particle-background';
import BrowserCheckDialog from '@/components/browser-check-dialog';

export default function Home() {
  return (
    <div className="flex min-h-full flex-col">
      <BrowserCheckDialog />
      <Header />
      <main className="flex-grow">
        <div className="relative flex h-full min-h-[calc(100vh-4rem)] items-end justify-center pb-24">
          <ParticleBackground />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          <div className="relative z-10 container mx-auto px-4">
            <Landing />
          </div>
        </div>
      </main>
    </div>
  );
}
