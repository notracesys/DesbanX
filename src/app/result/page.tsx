'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Shield, Star, AlertTriangle } from 'lucide-react';


const TOTAL_ANALYSIS_TIME = 10; // seconds

export default function ResultPage() {
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        const next = prev + 100 / (TOTAL_ANALYSIS_TIME * 10);
        if (next >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          return 100;
        }
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const loadingMessages = [
    'Analisando respostas...',
    'Cruzando dados com nosso sistema...',
    'Verificando histórico de banimentos...',
    'Procurando por brechas no sistema...',
    'Compilando relatório final...',
  ];

  const currentMessageIndex = Math.min(
    Math.floor(analysisProgress / (100 / loadingMessages.length)),
    loadingMessages.length - 1
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center container mx-auto px-4 py-8">
        {isAnalyzing ? (
          <div className="w-full max-w-2xl text-center space-y-6">
            <h1 className="font-headline text-3xl md:text-4xl font-bold">Analisando seu Caso...</h1>
            <p className="text-lg text-muted-foreground">{loadingMessages[currentMessageIndex]}</p>
            <Progress value={analysisProgress} className="w-full h-4" />
          </div>
        ) : (
          <div className="w-full max-w-3xl mx-auto space-y-12 animate-in fade-in-50 duration-1000">

            {/* Seção 1: Impacto Inicial */}
            <section className="text-center">
              <div className="mb-4 flex justify-center">
                    <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse-badge">🔥 Vagas limitadas para análise hoje</span>
                </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">🎉 Parabéns!</h1>
              <p className="text-2xl font-semibold text-green-400 flex items-center justify-center gap-2">
                <Check className="h-8 w-8" /> Sua conta TEM chances reais de recuperação
              </p>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Com base nas informações que você enviou, seu banimento apresenta características de bloqueio automático, o que abre possibilidade de reversão quando o caso é analisado corretamente.
              </p>
              <p className="mt-4 font-semibold text-lg">
                👉 Você não caiu aqui por acaso. A maioria das contas perde a chance porque não sabe como recorrer — você está um passo à frente.
              </p>
            </section>

            {/* Seção 2: Autoridade + Explicação */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">🔍 Por que sua conta pode voltar?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-center">Muitos banimentos no Free Fire são aplicados por sistemas automáticos, sem análise humana detalhada. Quando isso acontece:</p>
                <ul className="space-y-2 text-left bg-card-foreground/5 p-4 rounded-lg">
                  <li className="flex items-start gap-2"><span className="text-red-500 mt-1">❌</span><span>O sistema pode errar e interpretar ações normais como trapaça.</span></li>
                  <li className="flex items-start gap-2"><span className="text-red-500 mt-1">❌</span><span>Denúncias em massa por outros jogadores podem influenciar a decisão.</span></li>
                  <li className="flex items-start gap-2"><span className="text-red-500 mt-1">❌</span><span>A conta não é avaliada corretamente, ignorando seu histórico.</span></li>
                </ul>
                <p className="font-bold text-center text-lg">👉 Nosso trabalho é transformar esse bloqueio automático em uma análise manual, usando o processo correto.</p>
              </CardContent>
            </Card>

            {/* Seção 3: Apresentação */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">🛡️ Quem é a DesbanX?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-center">
                <p className="text-muted-foreground">A DesbanX é uma equipe especializada em análise e contestação de banimentos automáticos, focada em casos onde ainda existe possibilidade real de recuperação.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left pt-2">
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-card-foreground/5"><Check className="text-green-500 flex-shrink-0" /> Análise personalizada</div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-card-foreground/5"><Check className="text-green-500 flex-shrink-0" /> Processo estratégico</div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-card-foreground/5"><Check className="text-green-500 flex-shrink-0" /> Suporte direto</div>
                </div>
                <p className="font-semibold italic pt-4">Não prometemos milagres. Trabalhamos com método, experiência e estratégia.</p>
              </CardContent>
            </Card>

             {/* Seção 4: Gatilho de Oportunidade */}
            <div className="bg-destructive/10 border border-destructive/50 text-destructive-foreground p-6 rounded-lg text-center">
                <h2 className="text-2xl font-bold flex items-center justify-center gap-2">🚨 Atenção</h2>
                <p className="mt-2 text-lg font-semibold">O tempo importa.</p>
                <p className="text-destructive-foreground/80">Quanto antes o processo é iniciado, maiores são as chances de sucesso, principalmente em banimentos automáticos recentes. Adiar pode significar perder a oportunidade de revisão.</p>
            </div>

            {/* Seção 5: Prova Social */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-center">💬 O que nossos clientes dizem</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-card-foreground/5">
                        <CardContent className="p-4 text-center">
                            <div className="flex justify-center text-yellow-400 mb-2">{Array(5).fill(0).map((_, i) => <Star key={i} fill="currentColor" />)}</div>
                            <p className="text-sm italic text-muted-foreground">“Minha conta tinha tudo pra estar perdida. A DesbanX resolveu.”</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-card-foreground/5">
                        <CardContent className="p-4 text-center">
                            <div className="flex justify-center text-yellow-400 mb-2">{Array(5).fill(0).map((_, i) => <Star key={i} fill="currentColor" />)}</div>
                            <p className="text-sm italic text-muted-foreground">“Ban automático. Em poucos dias já tive resposta positiva.”</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-card-foreground/5">
                        <CardContent className="p-4 text-center">
                            <div className="flex justify-center text-yellow-400 mb-2">{Array(5).fill(0).map((_, i) => <Star key={i} fill="currentColor" />)}</div>
                            <p className="text-sm italic text-muted-foreground">“Valeu mais do que criar outra conta do zero.”</p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Seção 6: CTA Principal */}
            <section className="text-center bg-card p-8 rounded-lg shadow-2xl">
                 <h2 className="text-3xl font-bold mb-2">🔓 Pronto para tentar recuperar sua conta?</h2>
                 <p className="text-muted-foreground mb-6">Você já sabe que existe chance. Agora é a hora de agir com quem sabe o que está fazendo.</p>
                 <p className="mb-4">👇 Clique no botão abaixo e fale agora com a equipe da DesbanX</p>
                 
                <Button size="lg" className="w-full font-bold text-lg h-16 bg-green-500 hover:bg-green-600 text-black shadow-lg shadow-green-500/20 transform hover:scale-105 transition-transform">
                    🚀 QUERO INICIAR MINHA RECUPERAÇÃO 🚀
                </Button>
            </section>
            
            {/* Seção 7: Transparência */}
            <div className="text-center text-xs text-muted-foreground/80 p-4 rounded-lg bg-background">
                <p className="font-bold flex items-center justify-center gap-1"><AlertTriangle className="w-3 h-3" />Importante:</p>
                <p>Nem todo banimento é reversível. Cada conta passa por análise antes de qualquer procedimento. A decisão final é sempre da plataforma do jogo.</p>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
