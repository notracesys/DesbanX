'use client';

import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { PartyPopper } from 'lucide-react';

const names = [
  'João_123', 'Maria_Silva', 'xGamerPro', 'Lenda_FF', 'Mestre_do_Capa',
  'Ana_Z', 'Carlos_Player', 'zSlayer', 'Tio_Patrao', 'ReiDaBala',
  'Furia_Noturna', 'Sombra_BR', 'Vingador_X', 'Imperador_FF', 'Lucas_007'
];

const getRandomName = () => names[Math.floor(Math.random() * names.length)];

export default function RecoveryNotification() {
  const { toast } = useToast();

  useEffect(() => {
    const intervalId = setInterval(() => {
      const name = getRandomName();
      toast({
        title: (
            <div className="flex items-center gap-2">
                <PartyPopper className="h-5 w-5 text-green-500" />
                <span className="font-bold">Conta Recuperada!</span>
            </div>
        ),
        description: `${name} acabou de ter sua conta recuperada!`,
      });
    }, 6000); // 6 segundos

    return () => clearInterval(intervalId);
  }, [toast]);

  return null;
}
