'use client';

import Header from '@/components/header';
import Landing from '@/components/landing';
import BackgroundVideo from '@/components/background-video';
import BrowserCheckDialog from '@/components/browser-check-dialog';

export default function Home() {
  return (
    <div className="flex min-h-full flex-col">
      <BrowserCheckDialog />
      <Header />
      <main className="flex-grow flex flex-col -mt-4">
        <div className="relative h-[70vh] w-full">
          <BackgroundVideo />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        </div>
        <div className="py-8">
          <div className="relative z-10 container mx-auto px-4">
            <Landing />
          </div>
        </div>
      </main>
    </div>
  );
}
