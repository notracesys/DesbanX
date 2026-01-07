'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const Logo = () => (
    <Link href="/" className="flex items-center gap-4">
        <Image src="/desbanlogo.png" alt="Desban Logo" width={120} height={34} />
    </Link>
);

const ActiveUsers = () => {
    const [userCount, setUserCount] = useState<number | null>(null);

    useEffect(() => {
        // Define um número inicial aleatório entre 100 e 500
        const initialCount = Math.floor(Math.random() * 401) + 100;
        setUserCount(initialCount);

        // Configura um intervalo para atualizar o contador
        const interval = setInterval(() => {
            setUserCount(prevCount => {
                const currentCount = prevCount || initialCount;
                let newCount;

                // 10% de chance de uma queda grande
                if (Math.random() < 0.1) {
                    const bigDrop = Math.floor(Math.random() * 11) + 20; // Queda entre 20 e 30
                    newCount = currentCount - bigDrop;
                } else {
                    // 90% de chance de uma flutuação pequena
                    const smallFluctuation = Math.floor(Math.random() * 7) - 3; // Flutuação entre -3 e +3
                    newCount = currentCount + smallFluctuation;
                }
                
                // Garante que o número não caia abaixo de 100
                return Math.max(100, newCount);
            });
        }, 5000); // Roda a cada 5 segundos

        // Limpa o intervalo quando o componente é desmontado
        return () => clearInterval(interval);
    }, []);

    if (userCount === null) {
        return (
            <div className="flex items-center gap-2 text-sm text-foreground/80 animate-pulse">
                <div className="h-2 w-2 rounded-full bg-green-400/50"></div>
                Carregando...
            </div>
        );
    }
    
    return (
        <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="font-bold text-sm">{userCount}</span>
            <span className="text-sm text-foreground/80">usuários ativos</span>
        </div>
    );
};


export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/50 backdrop-blur-lg">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Logo />
        <ActiveUsers />
      </div>
    </header>
  );
}
