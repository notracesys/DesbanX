'use client';

import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function OfertaRecusadaPage() {
  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-16 flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl space-y-8 animate-in fade-in-50 duration-1000">
            <Card>
                <CardHeader className="items-center text-center">
                    <XCircle className="w-16 h-16 text-destructive mb-4" />
                    <CardTitle className="text-3xl font-headline">Oferta Recusada</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                    <p className="text-lg text-muted-foreground">
                        Você optou por não continuar com o serviço de análise. Entendemos sua decisão.
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Se mudar de ideia, você pode refazer o processo de análise a qualquer momento.
                    </p>
                    <Button asChild>
                        <Link href="/">
                            <Home className="mr-2 h-4 w-4" />
                            Voltar para o Início
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}
