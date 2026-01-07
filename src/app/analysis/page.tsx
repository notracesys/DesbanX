'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/hooks/use-toast';
import Header from '@/components/header';
import { ArrowRight } from 'lucide-react';

const quizSchema = z.object({
  suspensionTime: z.string({ required_error: 'Por favor, selecione uma opção.' }),
  thirdPartySoftware: z.string({ required_error: 'Por favor, selecione uma opção.' }),
  banReason: z.string({ required_error: 'Por favor, selecione uma opção.' }),
  firstOffense: z.string({ required_error: 'Por favor, selecione uma opção.' }),
  hasMadePurchases: z.string({ required_error: 'Por favor, selecione uma opção.' }),
  priorWarnings: z.string({ required_error: 'Por favor, selecione uma opção.' }),
});

type QuizFormValues = z.infer<typeof quizSchema>;

const questions = [
  {
    id: 'suspensionTime',
    label: 'Há quanto tempo sua conta foi suspensa?',
    options: ['Menos de 1 semana', 'Entre 1 semana e 1 mês', 'Entre 1 e 6 meses', 'Mais de 6 meses'],
  },
  {
    id: 'thirdPartySoftware',
    label: 'Você já utilizou algum tipo de software de terceiros (hacks, mods, etc.)?',
    options: ['Sim', 'Não', 'Não tenho certeza'],
  },
  {
    id: 'banReason',
    label: 'Qual foi o motivo que apareceu na mensagem de banimento?',
    options: ['Uso de software/aplicativo não oficial', 'Abuso de bugs ou falhas', 'Comportamento tóxico (ofensas)', 'Reembolso indevido (chargeback)', 'Não havia motivo especificado', 'Outro'],
  },
  {
    id: 'firstOffense',
    label: 'Esta é a primeira vez que sua conta é suspensa?',
    options: ['Sim', 'Não, já fui suspenso antes'],
  },
  {
    id: 'hasMadePurchases',
    label: 'Você já fez alguma compra de diamantes ou outros itens na conta?',
    options: ['Sim', 'Não'],
  },
  {
    id: 'priorWarnings',
    label: 'Antes do banimento, você recebeu avisos por comportamento inadequado (ex: ofensas no chat)?',
    options: ['Sim', 'Não', 'Não me lembro'],
  },
];


export default function AnalysisPage() {
  const form = useForm<QuizFormValues>({
    resolver: zodResolver(quizSchema),
  });

  function onSubmit(data: QuizFormValues) {
    console.log(data);
    toast({
      title: 'Análise Enviada!',
      description: 'Suas respostas foram registradas. Em breve você receberá um retorno.',
    });
  }

  function onError(errors: any) {
    toast({
        variant: "destructive",
        title: 'Perguntas Incompletas',
        description: 'Por favor, responda a todas as perguntas para continuar.',
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-16">
        <section className="text-center mb-12 animate-in fade-in-50 duration-1000">
            <h1 className="font-headline text-3xl md:text-4xl font-bold">Questionário de Análise</h1>
            <p className="mt-2 text-lg text-muted-foreground">
                Responda às perguntas abaixo para que nossa IA possa analisar seu caso.
            </p>
        </section>

        <div className="w-full max-w-4xl mx-auto space-y-6 animate-in fade-in-50 duration-1000">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-6">
                    {questions.map((question, index) => (
                    <FormField
                        key={question.id}
                        control={form.control}
                        name={question.id as keyof QuizFormValues}
                        render={({ field }) => (
                            <Card className="w-full">
                                <CardHeader className="bg-card-foreground/5 rounded-t-lg border-b p-4">
                                <CardTitle className="font-bold text-base flex items-center">
                                    <span className="bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center text-sm mr-2">{index + 1}</span> 
                                    {question.label}
                                </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                <FormControl>
                                    <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-2"
                                    >
                                    {question.options.map((option) => (
                                        <FormItem key={option} className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value={option} />
                                            </FormControl>
                                            <FormLabel className="font-normal text-base">
                                                {option}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                    </RadioGroup>
                                </FormControl>
                                </CardContent>
                            </Card>
                        )}
                    />
                    ))}
                    <div className="flex justify-end pt-4">
                        <Button type="submit" size="lg" className="font-bold bg-primary hover:bg-primary/90 text-primary-foreground">
                            Enviar para Análise
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
      </main>
    </div>
  );
}
