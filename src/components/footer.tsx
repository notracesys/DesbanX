import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-muted-foreground text-sm">
          Aguardando os textos para o rodapé...
        </p>
      </div>
    </footer>
  );
}
