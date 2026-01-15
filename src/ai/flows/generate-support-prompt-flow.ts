'use server';
/**
 * @fileOverview Flow para gerar um texto de apelação para o suporte.
 *
 * - generateSupportPrompt - Gera um texto formal para contestar um banimento.
 * - GenerateSupportPromptInput - O tipo de entrada (ID da conta).
 * - GenerateSupportPromptOutput - O tipo de saída (texto gerado).
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GenerateSupportPromptInputSchema = z.string().describe('O ID da conta do jogador.');
export type GenerateSupportPromptInput = z.infer<typeof GenerateSupportPromptInputSchema>;

const GenerateSupportPromptOutputSchema = z.object({
  supportText: z.string().describe('O texto de apelação gerado para enviar ao suporte.'),
});
export type GenerateSupportPromptOutput = z.infer<typeof GenerateSupportPromptOutputSchema>;

export async function generateSupportPrompt(input: GenerateSupportPromptInput): Promise<GenerateSupportPromptOutput> {
  return generateSupportPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSupportPrompt',
  input: { schema: GenerateSupportPromptInputSchema },
  output: { schema: GenerateSupportPromptOutputSchema },
  prompt: `
    Você é um especialista em regulamentos de jogos online. Sua tarefa é redigir um parágrafo de apelação formal e técnico para um jogador que foi banido injustamente e usará este texto em um formulário de suporte. O tom deve ser sério, respeitoso e firme.

    O ID da conta do jogador é: {{{input}}}

    O texto deve conter os seguintes pontos em um único parágrafo fluído:
    - Declarar o propósito do contato: solicitar uma reavaliação manual e detalhada da suspensão aplicada à conta de ID {{{input}}}.
    - Argumentar que a suspensão parece ter sido resultado de um sistema automatizado, que pode conter falsos positivos.
    - Afirmar que não houve violação dos Termos de Serviço e que a punição foi desproporcional ou equivocada.
    - Solicitar formalmente uma investigação humana e a apresentação de evidências que justifiquem o banimento.
    - Finalizar se colocando à disposição para fornecer qualquer informação adicional.

    Gere apenas o corpo do texto, sem saudações, assuntos ou despedidas.
  `,
});

const generateSupportPromptFlow = ai.defineFlow(
  {
    name: 'generateSupportPromptFlow',
    inputSchema: GenerateSupportPromptInputSchema,
    outputSchema: GenerateSupportPromptOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
