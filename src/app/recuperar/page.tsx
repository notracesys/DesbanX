'use client';

import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, Facebook, Twitter, MessageSquare, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const recoveryOptions = [
    { name: 'Convidado', icon: User, bodyText: 'Perdi o acesso da minha conta de Convidado.' },
    { name: 'Google', icon: Mail, bodyText: 'Perdi o acesso da minha conta vinculada ao Google.' },
    { name: 'Facebook', icon: Facebook, bodyText: 'Perdi o acesso da minha conta vinculada ao Facebook.' },
    { name: 'Twitter', icon: Twitter, bodyText: 'Perdi o acesso da minha conta vinculada ao Twitter.' },
    { name: 'VK', icon: MessageSquare, bodyText: 'Perdi o acesso da minha conta vinculada ao VK.' },
];

const email = 'contato@desbanx.com';
const subject = 'Recuperação de Conta - Acesso Perdido';

export default function RecuperarPage() {

  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-16 flex flex-col items-center justify-center">
          <div className="w-full max-w-2xl space-y-8 animate-in fade-in-50 duration-1000">
            <section className="text-center">
              <h1 className="font-headline text-3xl md:text-4xl font-bold">Recuperar Acesso</h1>
              <p className="mt-2 text-lg text-muted-foreground">
                Selecione a forma como sua conta estava conectada para iniciar a recuperação.
              </p>
            </section>
            
            <Card>
                <CardHeader>
                    <CardTitle>Qual o meio de vínculo da sua conta?</CardTitle>
                    <CardDescription>Clique na opção correspondente para enviar um e-mail pré-preenchido para nossa equipe de suporte.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-4">
                    {recoveryOptions.map((option) => {
                        const mailtoHref = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(option.bodyText)}`;
                        const Icon = option.icon;
                        return (
                            <Button asChild key={option.name} variant="outline" size="lg" className="justify-start text-base">
                                <Link href={mailtoHref}>
                                    <Icon className="mr-3 h-5 w-5" />
                                    <span>{option.name}</span>
                                    <ArrowRight className="ml-auto h-5 w-5 text-muted-foreground" />
                                </Link>
                            </Button>
                        )
                    })}
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}
