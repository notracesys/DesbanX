'use client';

import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, AlertTriangle, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function OfertaRecusadaPage() {
  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-16 flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl space-y-8 animate-in fade-in-50 duration-1000">
            <Card className="border-destructive/50">
                <CardHeader className="items-center text-center">
                    <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
                    <CardTitle className="text-3xl font-headline">Uma Escolha Definitiva?</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                    <p className="text-lg text-muted-foreground">
                        Você está a um passo de desistir. Mas é importante que saiba a verdade: sem uma abordagem técnica, as chances de recuperar uma conta banida por sistema são praticamente nulas.
                    </p>
                    <p className="text-foreground">
                        Continuar sozinho é aceitar a perda. Suas skins, patentes e memórias, perdidas para sempre. A plataforma não vai reavaliar seu caso por conta própria.
                    </p>
                    <p className="font-bold text-lg text-primary">
                        Esta é a sua última chance de lutar pela sua conta. O risco de não tentar é perder tudo.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white font-bold">
                            <Link href="https://pay.kirvano.com/c03ac9cc-9b2c-455d-a101-0816b338e5c0" target="_blank">
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Quero Reconsiderar
                            </Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href="/">
                                <Home className="mr-2 h-4 w-4" />
                                Desistir e Voltar ao Início
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
