'use client';

import Header from '@/components/header';
import Landing from '@/components/landing';
import ParticleBackground from '@/components/particle-background';
import BrowserCheckDialog from '@/components/browser-check-dialog';

export default function Home() {
  return (
    <div className="relative min-h-full">
      <BrowserCheckDialog />
      <ParticleBackground />
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background to-transparent" />
      <div className="relative z-10 flex min-h-full flex-col">
        <Header />
        <main className="flex-grow">
          <div className="container mx-auto px-4 flex h-full min-h-[calc(100vh-4rem)] items-end justify-center pb-12">
            <Landing />
          </div>
        </main>
      </div>
    </div>
  );
}
