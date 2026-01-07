'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FileScan, Loader2, MessageSquareQuote, Send, ShieldCheck, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const accountIdSchema = z.object({
  accountId: z.string().min(8, { message: 'O ID da conta deve ter pelo menos 8 dígitos.' }).regex(/^\d+$/, { message: 'Insira apenas números.' }),
  region: z.string({ required_error: 'Por favor, selecione uma região.'}),
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
}

const regions = [
  { value: 'BR', label: 'Brasil' },
  { value: 'EU', label: 'Europa' },
  { value: 'ID', label: 'Indonésia' },
  { value: 'MENA', label: 'MENA (Oriente Médio e Norte da África)' },
  { value: 'NA', label: 'América do Norte' },
  { value: 'SA', label: 'América do Sul (Espanhol)' },
  { value: 'SG', label: 'Singapura' },
  { value: 'TH', label: 'Tailândia' },
  { value: 'TW', label: 'Taiwan' },
  { value: 'VN', label: 'Vietnã' },
];


export default function Details({ onGenerateAppeal, appealText, isGenerating }: DetailsProps) {
  const [isVerified, setIsVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [accountData, setAccountData] = useState<AccountData | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const { toast } = useToast();

  const form = useForm<AccountIdForm>({
    resolver: zodResolver(accountIdSchema),
    defaultValues: { accountId: '' },
  });

  const handleVerify = async (data: AccountIdForm) => {
    setIsVerifying(true);
    setAccountData(null);
    try {
      const response = await fetch(`/api/verify-account?region=${data.region}&uid=${data.accountId}`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Não foi possível verificar a conta. Verifique o ID e a região.'}));
        throw new Error(errorData.message);
      }
      const result = await response.json();

      setAccountData({
        nickname: result.nickname,
        level: result.level || 0, // API might not return level
        server: result.region || result.server,
        status: 'Verificado', // API doesn't provide ban status, assuming verified if found
      });
      setIsVerified(true);
    } catch (error: any) {
        console.error("Verification failed:", error);
        toast({
            variant: "destructive",
            title: "Erro de Verificação",
            description: error.message || "Não foi possível carregar os dados no momento. Tente novamente.",
        });
        setIsVerified(false);
    } finally {
        setIsVerifying(false);
    }
  };
  
  const handleUnlock = () => {
    setIsUnlocked(true);
  }

  const handleGenerate = () => {
    if (accountData) {
      onGenerateAppeal(form.getValues('accountId'));
    }
  }

  return (
    <div className="w-full max-w-4xl space-y-12 animate-in fade-in-50 duration-1000">
      <section className="text-center">
        <h2 className="font-headline text-3xl md:text-4xl font-bold">O Caminho Para a Recuperação</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Nossa análise indicou uma boa chance, mas a jornada não acaba aqui. Veja como transformamos essa chance em realidade, de forma legítima e profissional.
        </p>
      </section>

      <section className="grid md:grid-cols-3 gap-8 text-center">
        <Card>
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
              <FileScan className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="font-headline mt-4">Análise Técnica</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Identificamos o tipo exato de banimento e cruzamos com possíveis falhas e erros comuns no sistema da Garena, formando a base da nossa argumentação.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
              <MessageSquareQuote className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="font-headline mt-4">Preparação do Recurso</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Elaboramos uma mensagem estratégica e persuasiva, utilizando a linguagem correta para o suporte oficial e argumentando com base nas políticas da empresa.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
              <Send className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="font-headline mt-4">Envio e Acompanhamento</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Orientamos você sobre como e onde enviar o recurso para maximizar a visibilidade e acompanhamos o status, sem acesso privilegiado, apenas com nossa experiência.</p>
          </CardContent>
        </Card>
      </section>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Passo 1: Verificação da Conta</CardTitle>
          <CardDescription>Para prosseguir, insira o ID e a região da sua conta do Free Fire. Usamos apenas dados públicos para confirmar as informações.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleVerify)} className="flex flex-col sm:flex-row gap-4 items-start">
              <FormField
                control={form.control}
                name="accountId"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="sr-only">ID da Conta</FormLabel>
                    <FormControl>
                      <Input placeholder="Insira o ID da sua conta" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="region"
                render={({ field }) => (
                  <FormItem className="w-full sm:w-64">
                    <FormLabel className="sr-only">Região</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a Região" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {regions.map(region => (
                          <SelectItem key={region.value} value={region.value}>{region.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isVerifying} className="w-full sm:w-auto">
                {isVerifying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Verificar Conta
              </Button>
            </form>
          </Form>
          
          {accountData && isVerified && (
            <Card className="bg-background/50 border-primary/50 mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="text-green-500" /> Conta Verificada
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Nickname</p>
                  <p className="font-bold">{accountData.nickname}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Servidor</p>
                  <p className="font-bold">{accountData.server}</p>
                </div>
                 <div>
                  <p className="text-muted-foreground">Status</p>
                  <p className="font-bold text-green-500">{accountData.status}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
      
      {isVerified && !isUnlocked && (
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
                <li className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" />Suporte para dúvidas durante o processo.</li>
            </ul>
             <Button size="lg" className="mt-4" onClick={handleUnlock}>
               Desbloquear Análise Completa Agora
             </Button>
             <p className="text-xs text-muted-foreground mt-2">Você será redirecionado para um checkout seguro. Este é um pagamento único.</p>
           </CardContent>
         </Card>
      )}

      {isUnlocked && (
        <Card className="w-full animate-in fade-in-50 duration-500">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Passo Final: Gere sua Apelação Personalizada</CardTitle>
            <CardDescription>Acesso liberado! Clique no botão abaixo para que nossa IA crie o texto de apelação perfeito para o seu caso.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!appealText && (
                 <Button onClick={handleGenerate} disabled={isGenerating} size="lg">
                    {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                    Gerar Texto de Apelação com IA
                </Button>
            )}
            {appealText && (
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
            )}
          </CardContent>
        </Card>
      )}

    </div>
  );
}
