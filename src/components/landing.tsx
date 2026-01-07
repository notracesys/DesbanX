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
        Muitas vezes, sua conta foi suspensa por um sistema automático, sem qualquer análise humana. Nossa ferramenta identifica essas falhas e abre o caminho para a recuperação.
      </p>
      <div className="mt-10">
        <Button
          size="lg"
          asChild
          className="font-bold relative overflow-hidden
                     bg-blue-600 hover:bg-blue-700 text-white
                     before:absolute before:inset-0
                     before:-translate-x-full
                     before:animate-shine
                     before:bg-gradient-to-r
                     before:from-transparent before:via-white/50 before:to-transparent"
        >
          <Link href="/verify">
            Iniciar Análise Gratuita
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
