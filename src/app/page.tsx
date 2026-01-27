'use client';

import Header from '@/components/header';
import Landing from '@/components/landing';
import ParticleBackground from '@/components/particle-background';
import BrowserCheckDialog from '@/components/browser-check-dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, ShieldQuestion, Target } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-full flex-col">
      <BrowserCheckDialog />
      <Header />
      <main className="flex-grow flex flex-col">
        {/* Hero Section */}
        <section className="relative -mt-16 flex h-screen w-full items-center justify-center">
          <ParticleBackground />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
          <div className="relative z-10 container mx-auto px-4">
            <Landing />
          </div>
        </section>

        {/* New Content Section */}
        <section className="py-20 md:py-28 text-center container mx-auto px-4">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">O Segredo Não é o "O Quê", é o "Como"</h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            A maioria dos jogadores falha ao tentar recuperar a conta porque envia textos genéricos, emocionados ou até mesmo agressivos. As plataformas de jogos recebem milhares de apelos todos os dias. O seu precisa se destacar pela técnica, não pelo drama.
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card>
                    <CardHeader className="items-center">
                        <div className="bg-primary/10 p-3 rounded-full">
                            <Target className="h-8 w-8 text-primary" />
                        </div>
                        <CardTitle className="mt-4 text-xl">Precisão Cirúrgica</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center text-muted-foreground">
                        Analisamos seu caso e geramos um texto de apelação focado nos pontos que realmente importam para os analistas do suporte, usando a linguagem e os argumentos que eles esperam ver.
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="items-center">
                        <div className="bg-primary/10 p-3 rounded-full">
                            <ShieldQuestion className="h-8 w-8 text-primary" />
                        </div>
                        <CardTitle className="mt-4 text-xl">Argumentação Técnica</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center text-muted-foreground">
                        Em vez de "eu não fiz nada", nosso método constrói um argumento que questiona a validade de um banimento automático, sugerindo a possibilidade de um falso positivo de forma respeitosa e formal.
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="items-center">
                        <div className="bg-primary/10 p-3 rounded-full">
                            <FileText className="h-8 w-8 text-primary" />
                        </div>
                        <CardTitle className="mt-4 text-xl">Tom Profissional</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center text-muted-foreground">
                        Removemos toda a emoção e criamos um texto com o tom certo: sério, direto e profissional. Isso aumenta drasticamente a chance de seu caso ser levado a sério por um analista humano.
                    </CardContent>
                </Card>
            </div>
      </section>
      </main>
    </div>
  );
}
