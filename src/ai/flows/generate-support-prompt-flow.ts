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
    Você é um especialista em regulamentos de jogos online e um advogado digital. Sua tarefa é redigir um texto de apelação formal e técnico para um jogador que foi banido injustamente. O tom deve ser sério, respeitoso e firme.

    O ID da conta do jogador é: {{{input}}}

    O texto deve seguir esta estrutura:

    1.  **Assunto:** "Apelação Formal de Suspensão de Conta - ID: {{{input}}}"
    2.  **Corpo do E-mail:**
        *   **Saudação:** "Prezada equipe de Suporte e Moderação,"
        *   **Introdução:** Apresente-se formalmente e declare o propósito do contato, que é solicitar uma reavaliação manual e detalhada da suspensão aplicada à conta de ID {{{input}}}.
        *   **Argumento Principal:** Argumente que a suspensão parece ter sido resultado de uma análise automatizada, que pode conter falsos positivos. Declare que você não violou os Termos de Serviço e que a punição foi desproporcional ou equivocada.
        *   **Pedido de Ação:** Solicite formalmente uma investigação humana e a apresentação de evidências concretas que justifiquem o banimento.
        *   **Encerramento:** Agradeça a atenção e se coloque à disposição para fornecer qualquer informação adicional.
        *   **Despedida:** "Atenciosamente," seguido de um espaço para o nome.

    Gere o texto completo formatado como um único bloco de texto.
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
