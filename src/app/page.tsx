'use client';

import Header from '@/components/header';
import Landing from '@/components/landing';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-16 flex flex-col items-center justify-center">
        <Landing />
      </main>
    </div>
  );
}
