'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ShieldCheck, Loader2, Info, AlertTriangle, PartyPopper, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from '@/lib/utils';
import Header from '@/components/header';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

const accountIdSchema = z.object({
  accountId: z.string()
    .min(8, { message: 'O ID da conta deve ter entre 8 e 12 dígitos.' })
    .max(12, { message: 'O ID da conta deve ter entre 8 e 12 dígitos.' })
    .regex(/^\d+$/, { message: 'Insira apenas números.' }),
});

type AccountIdForm = z.infer<typeof accountIdSchema>;

export default function VerifyPage() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState({ title: '', description: '', isError: true });

  const form = useForm<AccountIdForm>({
    resolver: zodResolver(accountIdSchema),
    defaultValues: { accountId: '' },
  });

  const handleVerify = (values: AccountIdForm) => {
    if (isVerified) return;

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
    }, 1000);
  };
  
  const onDialogClose = () => {
    setShowDialog(false);
  }

  const handleFormError = (errors: any) => {
    const accountIdError = errors.accountId?.message;
    if (accountIdError) {
        setDialogContent({
            title: 'ID Inválido',
            description: accountIdError,
            isError: true,
        });
        setShowDialog(true);
    }
  };


  return (
    <>
      <div className="flex min-h-full flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 md:py-16 flex flex-col items-center justify-center">
          <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2 justify-center">
                  {dialogContent.isError ? 
                    <AlertTriangle className="text-destructive" /> : 
                    <PartyPopper className="text-green-500" />
                  }
                  {dialogContent.title}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {dialogContent.description}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction onClick={onDialogClose} className="bg-blue-600 hover:bg-blue-700">
                  Tentar Novamente
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <div className="w-full max-w-4xl space-y-8 animate-in fade-in-50 duration-1000">
            <section className="text-center">
              <h2 className="font-headline text-3xl md:text-4xl font-bold">Recupere sua Conta</h2>
              <p className="mt-2 text-lg text-muted-foreground">
                Insira o ID da sua conta Free Fire para iniciar a análise.
              </p>
            </section>

            <Card className="w-full">
              <CardHeader className="bg-card-foreground/5 rounded-t-lg border-b p-4">
                <CardTitle className="font-bold text-base flex items-center">
                  <span className="bg-blue-600 text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center text-sm mr-2">1</span> Login
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleVerify, handleFormError)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="accountId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-normal text-sm flex items-center text-muted-foreground">ID do jogador <Info className="w-4 h-4 ml-1" /></FormLabel>
                          <div className="flex gap-2">
                            <FormControl>
                              <Input 
                                placeholder="Insira o ID de jogador aqui" 
                                {...field} 
                                className={cn(
                                  "text-base", 
                                  isVerified && "border-green-500 focus-visible:ring-green-500"
                                )} 
                                disabled={isVerified || isVerifying}
                              />
                            </FormControl>
                            <Button 
                              type="submit" 
                              className={cn(
                                "px-8 font-bold w-40 bg-blue-600 hover:bg-blue-700 text-white",
                                isVerified && "bg-green-600 hover:bg-green-700 text-white opacity-100"
                              )}
                              disabled={isVerifying}
                            >
                              {isVerifying ? (
                                <Loader2 className="animate-spin" />
                              ) : isVerified ? (
                                <>
                                  <ShieldCheck />
                                  Verificado
                                </>
                              ) : 'Login'}
                            </Button>
                          </div>
                          <FormMessage hidden />
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </CardContent>
            </Card>

            {isVerified && (
              <Card className="w-full animate-in fade-in-50 duration-1000">
                <CardHeader className="bg-card-foreground/5 rounded-t-lg border-b p-4">
                  <CardTitle className="font-bold text-base flex items-center">
                    <span className="bg-blue-600 text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center text-sm mr-2">2</span> Próximo Passo
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                    <p className="text-muted-foreground mb-4">Sua conta foi verificada com sucesso. Prossiga para a análise completa.</p>
                    <Button asChild className="font-bold bg-blue-600 hover:bg-blue-700 text-white">
                      <Link href="/analysis">
                        Prosseguir para Análise
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
