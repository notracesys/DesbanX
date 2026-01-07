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
import Processing from '@/components/processing';
import QuizForm from '@/components/quiz-form';
import Results from '@/components/results';
import { useToast } from '@/hooks/use-toast';
import type { QuizData } from '@/lib/types';

type Step = 'landing' | 'quiz' | 'processing' | 'results' | 'details';

function parseAppealAttempts(attemptString: string): number {
  if (attemptString.startsWith('Nenhuma')) return 0;
  if (attemptString.startsWith('1')) return 1;
  if (attemptString.startsWith('3')) return 3;
  if (attemptString.startsWith('Mais')) return 6;
  return 0;
}

export default function Home() {
  const [step, setStep] = useState<Step>('landing');
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeBanReasoningOutput | null>(null);
  const [appealText, setAppealText] = useState<GenerateAppealTextOutput | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const { toast } = useToast();

  const handleStart = () => {
    setStep('quiz');
  };

  const handleQuizSubmit = async (data: QuizData) => {
    setQuizData(data);
    setStep('processing');
    setIsAnalyzing(true);

    try {
      const result = await analyzeBanReasoning({
        ...data,
        appealAttempts: parseAppealAttempts(data.appealAttempts),
      });
      setAnalysisResult(result);
      setTimeout(() => {
        setStep('results');
        setIsAnalyzing(false);
      }, 1000); // Ensures processing screen shows for a bit
    } catch (error) {
      console.error('Analysis failed:', error);
      toast({
        variant: 'destructive',
        title: 'Erro na Análise',
        description: 'Não foi possível completar a análise. Por favor, tente novamente.',
      });
      setStep('quiz');
      setIsAnalyzing(false);
    }
  };

  const handleShowDetails = () => {
    setStep('details');
  };

  const handleGenerateAppeal = async (accountId: string) => {
    if (!quizData || !analysisResult) return;
    setIsGenerating(true);
    try {
      const result = await generateAppealText({
        banReason: quizData.banReason,
        appealAttempts: quizData.appealAttempts,
        accountValue: quizData.accountValue,
        violationPerception: quizData.violationPerception,
        accountId: accountId,
        analysisResult: analysisResult.analysisDetails,
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
      case 'quiz':
        return <QuizForm onSubmit={handleQuizSubmit} />;
      case 'processing':
        return <Processing isProcessing={isAnalyzing} />;
      case 'results':
        return <Results result={analysisResult} onNext={handleShowDetails} />;
      case 'details':
        return (
          <Details
            onGenerateAppeal={handleGenerateAppeal}
            appealText={appealText?.appealText}
            isGenerating={isGenerating}
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
