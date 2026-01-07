'use client';

import Header from '@/components/header';
import Landing from '@/components/landing';
import BackgroundVideo from '@/components/background-video';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-black">
      <Header />
      <main>
        <div className="relative h-[70vh] w-full">
          <BackgroundVideo />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
        </div>
        <div className="bg-black py-8">
          <div className="relative z-10 container mx-auto px-4">
            <Landing />
          </div>
        </div>
      </main>
    </div>
  );
}
