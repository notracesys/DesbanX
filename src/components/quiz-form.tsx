'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { quizQuestions } from '@/lib/data';
import type { QuizData } from '@/lib/types';
import { quizSchema } from '@/lib/types';

interface QuizFormProps {
  onSubmit: (data: QuizData) => void;
}

export default function QuizForm({ onSubmit }: QuizFormProps) {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentQuestion = quizQuestions[step];
  const form = useForm<QuizData>({
    resolver: zodResolver(quizSchema),
    defaultValues: {},
  });

  const handleNext = async () => {
    const fieldToValidate = currentQuestion.id as keyof QuizData;
    const isValid = await form.trigger(fieldToValidate);
    if (isValid) {
      if (step < quizQuestions.length - 1) {
        setStep(step + 1);
      } else {
        setIsSubmitting(true);
        form.handleSubmit(onSubmit)();
      }
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <Card className="w-full max-w-2xl animate-in fade-in-50 duration-500">
      <CardHeader>
        <CardTitle className="font-headline text-2xl md:text-3xl">{currentQuestion.question}</CardTitle>
        <CardDescription>{currentQuestion.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
            <FormField
              control={form.control}
              name={currentQuestion.id as keyof QuizData}
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-2"
                    >
                      {currentQuestion.options.map((option) => (
                        <FormItem
                          key={option}
                          className="flex items-center space-x-3 space-y-0 p-4 rounded-md border border-transparent hover:border-primary transition-all has-[:checked]:bg-primary/10 has-[:checked]:border-primary"
                        >
                          <FormControl>
                            <RadioGroupItem value={option} />
                          </FormControl>
                          <FormLabel className="font-normal text-base">{option}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  {form.formState.errors[currentQuestion.id as keyof QuizData] && (
                    <p className="text-sm font-medium text-destructive">
                      {form.formState.errors[currentQuestion.id as keyof QuizData]?.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <div className="flex justify-between items-center">
              <div>
                {step > 0 && (
                  <Button variant="ghost" onClick={handleBack} type="button">
                    Voltar
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  Passo {step + 1} de {quizQuestions.length}
                </span>
                <Button onClick={handleNext} type="button" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {step === quizQuestions.length - 1 ? 'Analisar' : 'Próximo'}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
