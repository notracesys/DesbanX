'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ShieldCheck, Loader2, Info, Copy, Check, Bot } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { cn } from '@/lib/utils';
import Header from '@/components/header';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { generateSupportPrompt } from '@/ai/flows/generate-support-prompt-flow';

const accountIdSchema = z.object({
  accountId: z.string()
    .min(8, { message: 'O ID da conta deve ter entre 8 e 12 dígitos.' })
    .max(12, { message: 'O ID da conta deve ter entre 8 e 12 dígitos.' })
    .regex(/^\d+$/, { message: 'Insira apenas números.' }),
});

type AccountIdForm = z.infer<typeof accountIdSchema>;

export default function CreatorStudioPage() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [showPromptDialog, setShowPromptDialog] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

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
      toast({
        title: 'ID Verificado',
        description: 'Sua conta foi verificada com sucesso.',
      });
    }, 1000);
  };

  const handleGeneratePrompt = async (accountId: string) => {
    setIsGenerating(true);
    try {
      const result = await generateSupportPrompt(accountId);
      setGeneratedPrompt(result.supportText);
      setShowPromptDialog(true);
    } catch (error) {
      console.error("Error generating prompt:", error);
      toast({
        variant: "destructive",
        title: "Erro ao gerar texto",
        description: "Não foi possível gerar o texto de suporte. Tente novamente.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setIsCopied(true);
    toast({
        title: "Copiado!",
        description: "O texto de suporte foi copiado para a área de transferência.",
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <>
      <div className="flex min-h-full flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 md:py-16 flex flex-col items-center justify-center">
          <Dialog open={showPromptDialog} onOpenChange={setShowPromptDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                    <Bot />
                    Texto de Suporte Gerado
                </DialogTitle>
                <DialogDescription>
                    Copie o texto abaixo e cole no formulário de suporte da Garena.
                </DialogDescription>
              </DialogHeader>
              <Textarea
                readOnly
                value={generatedPrompt}
                className="min-h-[200px] bg-muted/50"
              />
              <DialogFooter className="sm:justify-between gap-2">
                 <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Fechar
                    </Button>
                  </DialogClose>
                <Button onClick={copyToClipboard}>
                  {isCopied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                  {isCopied ? 'Copiado!' : 'Copiar Texto'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <div className="w-full max-w-4xl space-y-8 animate-in fade-in-50 duration-1000">
            <section className="text-center">
              <h2 className="font-headline text-3xl md:text-4xl font-bold">Gerador de Ticket de Suporte</h2>
              <p className="mt-2 text-lg text-muted-foreground">
                Informe o ID da sua conta para gerar um texto otimizado para a revisão do seu caso.
              </p>
            </section>

            <Card className="w-full">
              <CardHeader className="bg-card-foreground/5 rounded-t-lg border-b p-4">
                <CardTitle className="font-bold text-base flex items-center">
                  <span className="bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center text-sm mr-2">1</span> Login
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleVerify)} className="space-y-4">
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
                                  isVerified && "border-primary focus-visible:ring-primary"
                                )} 
                                disabled={isVerified || isVerifying}
                              />
                            </FormControl>
                            <Button 
                              type="submit" 
                              className={cn(
                                "px-8 font-bold w-40",
                                isVerified && "bg-green-500 hover:bg-green-600 text-primary-foreground"
                              )}
                              disabled={isVerifying || isVerified}
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
                          <FormMessage />
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
                    <span className="bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center text-sm mr-2">2</span> Gerar Texto
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                    <p className="text-muted-foreground mb-4">Sua conta foi verificada. Agora, clique abaixo para gerar o texto de suporte personalizado.</p>
                    <Button 
                        onClick={() => handleGeneratePrompt(form.getValues('accountId'))} 
                        className="font-bold"
                        disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Gerando...
                        </>
                      ) : (
                        <>
                            <Bot className="mr-2 h-5 w-5" />
                            Gerar Texto para Suporte
                        </>
                      )}
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
