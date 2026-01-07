'use client';

import { useState, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Smartphone, MoreVertical, ExternalLink } from 'lucide-react';

export default function BrowserCheckDialog() {
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const isBrowserChecked = sessionStorage.getItem('browserChecked');
    if (isBrowserChecked) {
      return;
    }

    const userAgent = navigator.userAgent || navigator.vendor;
    const isInstagram = userAgent.includes('Instagram');
    const isFacebook = userAgent.includes('FBAN') || userAgent.includes('FBAV');
    const isTikTok = userAgent.includes('TikTok');
    const isWebView = userAgent.includes('wv');

    if (isInstagram || isFacebook || isTikTok || isWebView) {
      setShowDialog(true);
    }
  }, []);

  const handleClose = () => {
    sessionStorage.setItem('browserChecked', 'true');
    setShowDialog(false);
  };

  if (!showDialog) {
    return null;
  }

  return (
    <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Smartphone />
            Abra no seu Navegador
          </AlertDialogTitle>
          <AlertDialogDescription>
            Para uma melhor experiência e para garantir que todas as funcionalidades funcionem corretamente, por favor, abra este site no seu navegador principal (Chrome, Safari, etc.).
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="my-4 text-sm text-foreground/90">
            <p>1. Clique nos três pontos <MoreVertical className="inline h-4 w-4 mx-1" /> no canto da tela.</p>
            <p>2. Selecione a opção &quot;Abrir no navegador&quot; <ExternalLink className="inline h-4 w-4 mx-1" />.</p>
        </div>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleClose} className="w-full bg-primary hover:bg-primary/90">
            Entendi
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
