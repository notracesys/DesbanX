import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-8 text-center text-muted-foreground text-sm space-y-6">
        <div className="max-w-3xl mx-auto space-y-2">
            <h4 className="font-bold text-foreground">Aviso Legal</h4>
            <p>Não garantimos a recuperação de contas. A decisão final é de responsabilidade exclusiva da plataforma do jogo. Cada caso é analisado individualmente, e os resultados podem variar.</p>
            <p>Não realizamos acesso a servidores, sistemas internos ou bancos de dados de terceiros. Nosso serviço consiste exclusivamente em análise, organização de informações e orientação técnica.</p>
        </div>
        <p>© 2026 — DesbanX. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
