'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, ShieldCheck, Gem, BarChart } from 'lucide-react';
import Confetti from '@/components/confetti';


const TOTAL_ANALYSIS_TIME = 10; // seconds
const CONFETTI_TIME = 5; // seconds

export default function ResultPage() {
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        const next = prev + 100 / (TOTAL_ANALYSIS_TIME * 10);
        if (next >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          setShowConfetti(true);
          return 100;
        }
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, CONFETTI_TIME * 1000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

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
    <div className="flex min-h-screen flex-col overflow-hidden">
      <Header />
      <main className="flex-grow flex items-center justify-center container mx-auto px-4 py-8">
        {isAnalyzing ? (
          <div className="w-full max-w-2xl text-center space-y-6">
            <h1 className="font-headline text-3xl md:text-4xl font-bold">Analisando seu Caso...</h1>
            <p className="text-lg text-muted-foreground">{loadingMessages[currentMessageIndex]}</p>
            <Progress value={analysisProgress} className="w-full h-4" />
          </div>
        ) : (
          <div className="w-full max-w-4xl text-center animate-in fade-in-50 duration-1000">
            {showConfetti && <Confetti />}
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-green-400">Boas notícias!</h1>
            <p className="mt-4 text-xl md:text-2xl text-muted-foreground">
              Sua conta tem potencial para ser recuperada com a ajuda da equipe <span className="font-bold text-primary">Desban X</span>.
            </p>
            <p className="mt-2 text-md text-muted-foreground/80">Identificamos uma alta probabilidade de anular a suspensão com nosso método.</p>

            <Card className="mt-10 text-left">
              <CardHeader>
                <CardTitle className="text-2xl text-center">O que você recebe:</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="flex flex-col items-center text-center p-4 rounded-lg bg-card-foreground/5">
                    <BarChart className="text-primary" size={40} />
                    <h3 className="mt-2 font-bold">Análise Completa</h3>
                    <p className="text-sm text-muted-foreground">Relatório detalhado sobre os pontos fracos do seu banimento.</p>
                </div>
                 <div className="flex flex-col items-center text-center p-4 rounded-lg bg-card-foreground/5">
                    <Gem className="text-primary" size={40} />
                    <h3 className="mt-2 font-bold">Dossiê Exclusivo</h3>
                    <p className="text-sm text-muted-foreground">Argumentos e provas para reverter a decisão da Garena.</p>
                </div>
                 <div className="flex flex-col items-center text-center p-4 rounded-lg bg-card-foreground/5">
                    <ShieldCheck className="text-primary" size={40} />
                    <h3 className="mt-2 font-bold">Garantia de Suporte</h3>
                    <p className="text-sm text-muted-foreground">Nossa equipe acompanha você durante todo o processo.</p>
                </div>
              </CardContent>
            </Card>

            <div className="mt-10">
              <Button size="lg" className="font-bold text-lg h-14 bg-green-500 hover:bg-green-600 text-black">
                Quero Recuperar Minha Conta Agora
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
               <p className="text-xs mt-2 text-muted-foreground">Vagas limitadas. Pagamento único e seguro.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
