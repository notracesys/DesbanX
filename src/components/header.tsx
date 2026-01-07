import Link from 'next/link';

const Logo = () => (
    <Link href="/" className="font-headline text-2xl font-bold tracking-tighter text-foreground transition-colors hover:text-primary">
      <span className="text-primary">FF</span> Account Assist
    </Link>
  );

export default function Header() {
  return (
    <header className="w-full border-b border-border/40">
      <div className="container mx-auto px-4 h-20 flex items-center justify-center">
        <Logo />
      </div>
    </header>
  );
}
