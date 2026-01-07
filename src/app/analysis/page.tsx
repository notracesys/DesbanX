'use client';

import Header from '@/components/header';

export default function AnalysisPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-16 flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl space-y-8 text-center animate-in fade-in-50 duration-1000">
            <h1 className="font-headline text-3xl md:text-4xl font-bold">Página de Análise</h1>
            <p className="mt-2 text-lg text-muted-foreground">
                Em construção.
            </p>
        </div>
      </main>
    </div>
  );
}
