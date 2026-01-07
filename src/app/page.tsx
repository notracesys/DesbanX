'use client';

import Header from '@/components/header';
import Landing from '@/components/landing';
import BackgroundVideo from '@/components/background-video';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="relative flex flex-col min-h-[calc(100vh-5rem)]">
        <BackgroundVideo />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex-grow flex flex-col items-center justify-center container mx-auto px-4 py-8 md:py-16">
          <Landing />
        </div>
      </main>
    </div>
  );
}