'use client';

import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function OfertaRecusadaPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-16 flex flex-col items-center justify-center">
        <div className="w-full max-w-3xl space-y-8 animate-in fade-in-50 duration-1000">
            <Card className="border-destructive/50 shadow-lg shadow-destructive/10">
                <CardHeader className="items-center text-center p-6">
                    <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
                    <CardTitle className="text-3xl font-headline">Você tem certeza?</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-6 px-6 pb-8">
                    <p className="text-lg text-muted-foreground">
                        Você está prestes a tomar uma decisão que pode ser irreversível. É crucial que você entenda uma coisa: banimentos automáticos são como uma sentença de culpa.
                    </p>
                    <p className="text-foreground text-lg leading-relaxed">
                        Quando você <span className="font-bold text-destructive">NÃO RECORRE</span>, o sistema entende que você está <span className="font-bold text-destructive">ACEITANDO A PUNIÇÃO</span>. Ele marca seu caso como "resolvido", e suas chances de recuperação despencam para quase <span className="font-bold">ZERO</span>.
                    </p>
                    <p className="font-bold text-xl text-primary animate-pulse-badge">
                        Não agir é a pior escolha. O tempo corre contra você.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <Button onClick={() => router.back()} className="font-bold text-lg">
                            <ArrowLeft className="mr-2 h-5 w-5" />
                            Me Arrependi, quero voltar!
                        </Button>
                        <Button asChild variant="outline">
                            <Link href="/">
                                <Home className="mr-2 h-4 w-4" />
                                Desistir e Perder a Conta
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}
