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
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-circle-2 text-gray-300"><path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/></svg>
        </div>
      </div>
    </header>
  );
}
