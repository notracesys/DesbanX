'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Logo = () => (
    <Link href="/" className="flex items-center gap-4">
        <Image src="/desbanlogo.png" alt="Desban Logo" width={120} height={34} />
    </Link>
);

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12.52.02C13.84 0 15.14.01 16.44 0a5 5 0 0 1 4.98 4.98c.01 1.3.02 2.6.02 3.9s-.01 2.6-.02 3.9a5 5 0 0 1-4.98 4.98c-1.3.01-2.6.02-3.9.02s-2.6-.01-3.9-.02a5 5 0 0 1-4.98-4.98c-.01-1.3-.02-2.6-.02-3.9s.01-2.6.02-3.9a5 5 0 0 1 4.98-4.98c1.3-.01 2.6-.02 3.9-.02z" />
    <path d="M8.5 4.5a.5.5 0 0 0 .5.5v5.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-1.5-.5z" />
    <path d="M12 9.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
  </svg>
);


const TelegramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </svg>
);


export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-black/50 backdrop-blur-lg">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-2">
           <Button variant="ghost" size="icon" className="hover:bg-white/10" asChild>
            <Link href="https://tiktok.com" target="_blank">
                <TikTokIcon className="h-5 w-5 text-white" />
                <span className="sr-only">TikTok</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-white/10" asChild>
            <Link href="https://telegram.org" target="_blank">
                <TelegramIcon className="h-5 w-5 text-white" />
                <span className="sr-only">Telegram</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
