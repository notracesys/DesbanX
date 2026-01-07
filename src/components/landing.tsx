import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Landing() {
  return (
    <div className="text-center animate-in fade-in-50 duration-1000">
      <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-white uppercase">
        Recupere sua conta de free fire
      </h1>
      <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-200">
        Nossa ferramenta de IA faz uma avaliação gratuita baseada em milhares de padrões reais de reversão de banimento. Sem promessas falsas, apenas análise de dados.
      </p>
      <div className="mt-10">
        <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
          <Link href="/verify">
            Iniciar Análise Gratuita
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
