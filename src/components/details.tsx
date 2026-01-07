
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ShieldCheck, Sparkles, Loader2, Info, AlertTriangle, PartyPopper } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { AnalyzeBanReasoningOutput } from '@/ai/flows/analyze-ban-reasoning';
import Results from '@/components/results';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const accountIdSchema = z.object({
  accountId: z.string().min(8, { message: 'O ID da conta deve ter pelo menos 8 dígitos.' }).regex(/^\d+$/, { message: 'Insira apenas números.' }),
});

type AccountIdForm = z.infer<typeof accountIdSchema>;

type AccountData = {
  nickname: string;
  level: number;
  server: string;
  status: string;
};

interface DetailsProps {
  onGenerateAppeal: (accountId: string) => void;
  appealText?: string;
  isGenerating: boolean;
  analysisResult: AnalyzeBanReasoningOutput | null;
}

export default function Details({ onGenerateAppeal, appealText, isGenerating, analysisResult }: DetailsProps) {
  const [isVerified, setIsVerified] = useState(false);
  const [accountData, setAccountData] = useState<AccountData | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState({ title: '', description: '', isError: true });

  const form = useForm<AccountIdForm>({
    resolver: zodResolver(accountIdSchema),
    defaultValues: { accountId: '' },
  });

  const handleVerify = (data: AccountIdForm) => {
    // Simulando sucesso já que a API foi removida
    setAccountData({
      nickname: `Jogador_${data.accountId.slice(0, 4)}`,
      level: 50,
      server: 'BR',
      status: 'Verificado',
    });
    setDialogContent({
      title: 'Conta Verificada!',
      description: 'Sua conta foi verificada com sucesso. Prossiga para a próxima etapa.',
      isError: false,
    });
    setShowDialog(true);
  };
  
  const onDialogClose = () => {
    setShowDialog(false);
    if (!dialogContent.isError) {
      setIsVerified(true);
    }
  }


  const handleUnlock = () => {
    setIsUnlocked(true);
    if (form.getValues('accountId')) {
      onGenerateAppeal(form.getValues('accountId'));
    }
  }

  const handleShowResults = () => {
    setShowResults(true);
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


  if (showResults && analysisResult) {
    return <Results result={analysisResult} onNext={() => setShowResults(false)} />;
  }

  return (
    <>
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
            <AlertDialogAction onClick={onDialogClose}>
              {dialogContent.isError ? 'Tentar Novamente' : 'Continuar'}
              </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="w-full max-w-4xl space-y-8 animate-in fade-in-50 duration-1000">
        {!isUnlocked ? (
          <>
            <section className="text-center">
              <h2 className="font-headline text-3xl md:text-4xl font-bold">Recupere sua Conta</h2>
              <p className="mt-2 text-lg text-muted-foreground">
                Insira o ID da sua conta Free Fire que foi banida ou hackeada para iniciar a análise.
              </p>
            </section>

            <Card className="w-full">
              <CardHeader className="bg-[#f7f7f7] rounded-t-lg border-b p-4">
                <CardTitle className="font-bold text-base flex items-center">
                  <span className="bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center text-sm mr-2">1</span> Login
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
                          <FormLabel className="font-normal text-sm flex items-center text-gray-600">ID do jogador <Info className="w-4 h-4 ml-1" /></FormLabel>
                          <div className="flex gap-2">
                            <FormControl>
                              <Input placeholder="Insira o ID de jogador aqui" {...field} className="text-base" />
                            </FormControl>
                            <Button type="submit" className="px-8 font-bold">
                              Login
                            </Button>
                          </div>
                          <FormMessage hidden />
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>

                {accountData && isVerified && (
                  <Card className="bg-green-50 border-green-200 mt-6">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-green-800">
                        <ShieldCheck className="text-green-600" /> Conta Verificada
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Nickname</p>
                        <p className="font-bold text-gray-800">{accountData.nickname}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Servidor</p>
                        <p className="font-bold text-gray-800">{accountData.server}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Status</p>
                        <p className="font-bold text-green-600">{accountData.status}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>

            {isVerified && (
              <Card className="w-full bg-primary/5 border-primary text-center animate-in fade-in-50 duration-500">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">Passo 2: Desbloqueie sua Análise Completa</CardTitle>
                  <CardDescription>Sua verificação foi um sucesso! Agora, libere o poder da nossa análise completa e receba o texto de apelação otimizado por IA, pronto para ser enviado.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="text-left max-w-md mx-auto space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" />Análise individual e aprofundada do seu caso.</li>
                    <li className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" />Texto de recurso personalizado e persuasivo.</li>
                    <li className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" />Guia passo a passo para o envio correto.</li>
                  </ul>
                  <Button size="lg" className="mt-4" onClick={handleUnlock} disabled={isGenerating}>
                    {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                    Desbloquear e Gerar Análise
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">Você será redirecionado para um checkout seguro. Este é um pagamento único.</p>
                </CardContent>
              </Card>
            )}
          </>
        ) : (
          <>
            {isGenerating && !analysisResult && (
              <Card className="w-full max-w-2xl text-center flex flex-col items-center space-y-8 animate-in fade-in-50 duration-500">
                <CardHeader>
                  <CardTitle className="font-headline text-3xl md:text-4xl font-bold">Gerando sua Análise...</CardTitle>
                  <CardDescription className="text-lg text-muted-foreground">Nossa IA está trabalhando. Isso pode levar alguns segundos.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                </CardContent>
              </Card>
            )}

            {analysisResult && !appealText && (
              <div className="w-full max-w-4xl animate-in fade-in-50 duration-500">
                <Results result={analysisResult} onNext={handleShowResults} />
              </div>
            )}

            {appealText && (
              <Card className="w-full animate-in fade-in-50 duration-500 mt-8">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">Passo Final: Sua Apelação Personalizada</CardTitle>
                  <CardDescription>Copie o texto abaixo e siga as instruções para enviá-lo ao suporte da Garena.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <h3 className="font-bold">Texto de Apelação Gerado:</h3>
                    <Textarea
                      readOnly
                      value={appealText}
                      className="min-h-[250px] bg-background/50"
                    />
                    <p className="text-sm text-muted-foreground">
                      <strong>Próximos passos:</strong> Copie este texto e envie para o suporte oficial da Garena. Siga as instruções que enviamos para o seu email para maximizar suas chances.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </>
  );
}
