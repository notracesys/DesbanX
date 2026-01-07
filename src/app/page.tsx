'use client';

import { useState } from 'react';
import type { AnalyzeBanReasoningOutput } from '@/ai/flows/analyze-ban-reasoning';
import { analyzeBanReasoning } from '@/ai/flows/analyze-ban-reasoning';
import type { GenerateAppealTextOutput } from '@/ai/flows/generate-appeal-text';
import { generateAppealText } from '@/ai/flows/generate-appeal-text';
import Details from '@/components/details';
import Footer from '@/components/footer';
import Header from '@/components/header';
import Landing from '@/components/landing';
import { useToast } from '@/hooks/use-toast';

type Step = 'landing' | 'details';

export default function Home() {
  const [step, setStep] = useState<Step>('landing');
  const [appealText, setAppealText] = useState<GenerateAppealTextOutput | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeBanReasoningOutput | null>(null);


  const { toast } = useToast();

  const handleStart = () => {
    setStep('details');
  };

  const handleGenerateAppeal = async (accountId: string) => {
    setIsGenerating(true);
    
    // Hardcoded quiz data since the quiz is removed
    const quizData = {
      banReason: 'Uso de software de terceiros (hack, script, etc.)',
      appealAttempts: 'Nenhuma vez, esta é a primeira',
      accountValue: 'Ambos, o valor sentimental e financeiro são importantes',
      violationPerception: 'Não, tenho certeza que foi um engano ou mal-entendido.',
    };

    try {
      // Run analysis first (silently)
      const analysis = await analyzeBanReasoning({
        banReason: quizData.banReason,
        appealAttempts: 0, // Simplified
        accountValue: quizData.accountValue,
        violationPerception: quizData.violationPerception,
      });
      setAnalysisResult(analysis);

      // Then generate appeal text
      const result = await generateAppealText({
        ...quizData,
        accountId: accountId,
        analysisResult: analysis.analysisDetails,
      });
      setAppealText(result);
    } catch (error) {
      console.error('Appeal text generation failed:', error);
      toast({
        variant: 'destructive',
        title: 'Erro ao Gerar Texto',
        description: 'Não foi possível gerar o texto da apelação. Tente novamente.',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 'landing':
        return <Landing onStart={handleStart} />;
      case 'details':
        return (
          <Details
            onGenerateAppeal={handleGenerateAppeal}
            appealText={appealText?.appealText}
            isGenerating={isGenerating}
            analysisResult={analysisResult}
          />
        );
      default:
        return <Landing onStart={handleStart} />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-16 flex flex-col items-center justify-center">
        {renderStep()}
      </main>
      <Footer />
    </div>
  );
}
