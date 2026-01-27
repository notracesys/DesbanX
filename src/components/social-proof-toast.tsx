'use client';

import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart } from 'lucide-react';

const names = [
  'Carlos S.', 'Ana P.', 'Lucas M.', 'Juliana F.', 'Rafael G.', 'Fernanda L.', 'Bruno C.', 'Mariana A.',
  'Pedro H.', 'Camila R.', 'Gabriel O.', 'Larissa V.', 'Matheus B.', 'Beatriz E.', 'Thiago N.', 'Laura D.',
  'Felipe J.', 'Amanda K.', 'Rodrigo Q.', 'Sofia T.', 'Ricardo M.', 'Leticia C.', 'Daniel A.', 'Patricia G.',
  'Vinicius R.', 'Isabela P.', 'Eduardo F.', 'Gabriela L.'
];

export default function SocialProofToast() {
  const { toast } = useToast();
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    if (!isBrowser) {
      return;
    }

    const showRandomToast = () => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      toast({
        variant: 'social',
        title: (
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4 text-primary flex-shrink-0" />
            <p className="text-xs font-medium text-foreground">
              {randomName} acabou de adquirir o método.
            </p>
          </div>
        ),
      });
    };

    let intervalId: NodeJS.Timeout;

    // Start showing toasts after an initial delay
    const firstToastTimeout = setTimeout(() => {
      showRandomToast();
      // Then set an interval for subsequent toasts
      intervalId = setInterval(showRandomToast, Math.random() * (28000 - 18000) + 18000); // Between 18-28 seconds
    }, 15000); // 15 seconds for first toast

    return () => {
      clearTimeout(firstToastTimeout);
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [toast, isBrowser]);

  return null; // This component doesn't render anything itself
};
