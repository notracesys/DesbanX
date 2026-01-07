'use client';

import Header from '@/components/header';
import Landing from '@/components/landing';
import BackgroundVideo from '@/components/background-video';

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <BackgroundVideo />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 flex flex-col flex-grow">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 md:py-16 flex flex-col items-center justify-center">
          <Landing />
        </main>
      </div>
    </div>
  );
}
