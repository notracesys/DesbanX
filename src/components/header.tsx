import Image from 'next/image';
import Link from 'next/link';

const Logo = () => (
    <Link href="/" className="flex items-center gap-4">
        <Image src="/desbanlogo.png" alt="Desban Logo" width={140} height={40} />
    </Link>
);

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-black/50 backdrop-blur-lg">
      <div className="container mx-auto px-4 h-16 flex items-center justify-center">
        <Logo />
      </div>
    </header>
  );
}
