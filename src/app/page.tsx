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
      <main className="flex-grow relative">
        <ParticleBackground />
        <div className="relative container mx-auto px-4 flex h-full min-h-[calc(100vh-4rem)] items-end justify-center pb-12">
          <Landing />
        </div>
      </main>
    </div>
  );
}
