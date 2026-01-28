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
    Você é um especialista em comunicação técnica para suporte de jogos online. Sua tarefa é redigir um parágrafo formal e neutro para um jogador que perdeu o acesso à sua conta e suspeita de um erro sistêmico. O texto será usado em um formulário de suporte. O objetivo é evitar filtros automáticos de palavras-chave como "banimento" ou "suspensão" e solicitar uma análise humana. O tom deve ser sério, respeitoso e focado na resolução de um problema técnico.

    O texto deve conter os seguintes pontos em um único parágrafo fluído:
    - Declarar o propósito do contato: solicitar um diagnóstico técnico sobre uma restrição de acesso à minha conta.
    - Levantar a hipótese de que a inacessibilidade pode ser resultado de uma anomalia sistêmica ou erro de um processo automatizado.
    - Afirmar que, segundo meu conhecimento, todas as minhas atividades na plataforma sempre estiveram em conformidade com os Termos de Serviço.
    - Solicitar formalmente uma verificação manual do status da conta e a clarificação sobre o motivo da restrição de acesso.
    - Finalizar se colocando à disposição para fornecer qualquer informação adicional para a análise.

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
