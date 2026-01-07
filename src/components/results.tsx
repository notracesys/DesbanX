'use client';

import type { AnalyzeBanReasoningOutput } from '@/ai/flows/analyze-ban-reasoning';
import { Sparkles } from 'lucide-react';
import Confetti from '@/components/confetti';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ResultsProps {
  result: AnalyzeBanReasoningOutput;
  onNext: () => void;
}

const getLikelihoodProps = (likelihood: string | undefined) => {
  switch (likelihood?.toLowerCase()) {
    case 'high':
      return { text: 'Alta', className: 'bg-green-500/20 text-green-400 border-green-500/30' };
    case 'medium':
      return { text: 'Média', className: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' };
    case 'low':
      return { text: 'Baixa', className: 'bg-red-500/20 text-red-400 border-red-500/30' };
    default:
      return { text: 'Indeterminada', className: '' };
  }
};

export default function Results({ result, onNext }: ResultsProps) {
  
  const likelihoodProps = getLikelihoodProps(result.recoveryLikelihood);
  const isPositiveResult = result.recoveryLikelihood?.toLowerCase() === 'high' || result.recoveryLikelihood?.toLowerCase() === 'medium';

  return (
    <div className="w-full max-w-4xl space-y-8 animate-in fade-in-50 duration-1000 relative">
      {isPositiveResult && <Confetti />}
      <div className="text-center">
        {isPositiveResult ? (
          <>
            <h1 className="font-headline text-4xl md:text-5xl font-bold">Boas notícias!</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Sua conta apresenta indícios fortes de recuperação com base na nossa análise de dados.
            </p>
          </>
        ) : (
          <>
            <h1 className="font-headline text-4xl md:text-5xl font-bold">Análise Concluída</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              O caminho para a recuperação pode ser desafiador, mas ainda existem possibilidades.
            </p>
          </>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Resumo da Análise de IA</CardTitle>
          <CardDescription>
            Esta análise é baseada em um conjunto de dados sobre o seu caso.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 rounded-lg bg-background">
            <span className="text-lg font-medium">Probabilidade de Recuperação</span>
            <Badge variant="outline" className={`text-lg px-4 py-1 ${likelihoodProps.className}`}>
              {likelihoodProps.text}
            </Badge>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Detalhes da Análise:</h3>
            <p className="text-muted-foreground whitespace-pre-wrap">{result.analysisDetails}</p>
          </div>
        </CardContent>
      </Card>

      <Alert variant="destructive">
        <AlertTitle>Aviso Legal Importante</AlertTitle>
        <AlertDescription>
          Esta análise é uma estimativa baseada em dados e não uma garantia de recuperação. O sucesso da apelação depende exclusivamente da avaliação final da Garena. Nosso serviço visa maximizar suas chances através de um recurso bem fundamentado e profissional.
        </AlertDescription>
      </Alert>


      <div className="text-center">
        <Button size="lg" onClick={onNext}>
            <Sparkles className="mr-2 h-4 w-4" />
            Gerar Texto de Apelação com IA
        </Button>
      </div>
    </div>
  );
}
