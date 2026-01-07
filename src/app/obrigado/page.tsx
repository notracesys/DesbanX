'use client';

import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Home } from 'lucide-react';
import Link from 'next/link';

export default function ObrigadoPage() {
  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-16 flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl space-y-8 animate-in fade-in-50 duration-1000">
            <Card>
                <CardHeader className="items-center text-center">
                    <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                    <CardTitle className="text-3xl font-headline">Pagamento Aprovado!</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                    <p className="text-lg text-muted-foreground">
                        Sua solicitação foi enviada para nossa equipe de especialistas. Em breve, você receberá um e-mail com mais detalhes e os próximos passos para o processo de recuperação.
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Por favor, verifique sua caixa de entrada e a pasta de spam.
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
