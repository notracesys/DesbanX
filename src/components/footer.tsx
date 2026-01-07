import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-border/40 py-8">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <div className="flex justify-center gap-4 mb-4">
          <Link href="#" className="hover:text-primary transition-colors">FAQ</Link>
          <Link href="#" className="hover:text-primary transition-colors">Termos de Uso</Link>
          <Link href="#" className="hover:text-primary transition-colors">Política de Reembolso</Link>
        </div>
        <p className="mb-2">
          FF Account Assist é um serviço independente e não é afiliado, endossado ou patrocinado pela Garena ou Free Fire. Free Fire é uma marca registrada da Garena International.
        </p>
        <p>
          Nosso serviço se baseia em análise de dados e experiência para criar recursos de apelação, mas não garantimos a recuperação da conta. A decisão final é exclusivamente da Garena.
        </p>
        <p className="mt-4">© {new Date().getFullYear()} FF Account Assist. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
