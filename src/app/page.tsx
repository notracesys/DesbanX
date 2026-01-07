'use client';

import { useState } from 'react';
import Details from '@/components/details';
import Header from '@/components/header';
import Landing from '@/components/landing';

type Step = 'landing' | 'details';

export default function Home() {
  const [step, setStep] = useState<Step>('landing');

  const handleStart = () => {
    setStep('details');
  };

  const renderStep = () => {
    switch (step) {
      case 'landing':
        return <Landing onStart={handleStart} />;
      case 'details':
        return <Details />;
      default:
        return <Landing onStart={handleStart} />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-16 flex flex-col items-center justify-center">
        {renderStep()}
      </main>
    </div>
  );
}
