import { z } from 'zod';

export const quizSchema = z.object({
  banReason: z.string({ required_error: 'Por favor, selecione o motivo do banimento.' }),
  appealAttempts: z.string({ required_error: 'Por favor, selecione o número de tentativas.' }),
  accountValue: z.string({ required_error: 'Por favor, selecione o valor da conta.' }),
  violationPerception: z.string({ required_error: 'Por favor, selecione sua percepção.' }),
});

export type QuizData = z.infer<typeof quizSchema>;
