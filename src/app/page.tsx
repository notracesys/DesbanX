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
      <main className="flex-grow flex flex-col -mt-16">
        <div className="relative h-screen w-full bg-background">
          <ParticleBackground />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative z-10 container mx-auto px-4">
            <Landing />
          </div>
        </div>
      </main>
    </div>
  );
}
