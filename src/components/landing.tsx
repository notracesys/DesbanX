import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface LandingProps {
  onStart: () => void;
}

export default function Landing({ onStart }: LandingProps) {
  return (
    <div className="text-center animate-in fade-in-50 duration-1000">
      <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-br from-gray-200 via-gray-400 to-gray-600 bg-clip-text text-transparent">
        Descubra agora se sua conta do Free Fire pode ser recuperada
      </h1>
      <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
        Nossa ferramenta de IA faz uma avaliação gratuita baseada em milhares de padrões reais de reversão de banimento. Sem promessas falsas, apenas análise de dados.
      </p>
      <div className="mt-10">
        <Button size="lg" onClick={onStart}>
          Iniciar Análise Gratuita
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
