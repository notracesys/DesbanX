'use client';

import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';

const analysisSteps = [
  'Analisando histórico do banimento...',
  'Cruzando dados com padrões de reversão...',
  'Verificando elegibilidade para apelação...',
  'Calculando probabilidade de sucesso...',
  'Compilando resultados...',
];

interface ProcessingProps {
  isProcessing: boolean;
}

export default function Processing({ isProcessing }: ProcessingProps) {
  const [progress, setProgress] = useState(10);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress(prev => (prev < 95 ? prev + 2 : prev));
    }, 100);

    const stepTimer = setInterval(() => {
      setCurrentStep(prev => (prev < analysisSteps.length - 1 ? prev + 1 : prev));
    }, 1500);

    if (!isProcessing) {
      clearInterval(progressTimer);
      clearInterval(stepTimer);
      setProgress(100);
    }

    return () => {
      clearInterval(progressTimer);
      clearInterval(stepTimer);
    };
  }, [isProcessing]);

  return (
    <div className="w-full max-w-2xl text-center flex flex-col items-center space-y-8 animate-in fade-in-50 duration-500">
      <h2 className="font-headline text-3xl md:text-4xl font-bold">Processando sua Análise</h2>
      <p className="text-lg text-muted-foreground">Nossa IA está trabalhando. Isso pode levar alguns segundos.</p>
      <div className="w-full space-y-4">
        <Progress value={progress} className="w-full" />
        <p className="text-primary font-medium h-6">
            {analysisSteps[currentStep]}
        </p>
      </div>
    </div>
  );
}
