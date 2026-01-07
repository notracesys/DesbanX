'use server';
/**
 * @fileOverview Analyzes the reason for a Free Fire account ban and provides a likelihood of recovery based on AI analysis.
 *
 * - analyzeBanReasoning - A function that handles the ban reason analysis and recovery likelihood assessment.
 * - AnalyzeBanReasoningInput - The input type for the analyzeBanReasoning function.
 * - AnalyzeBanReasoningOutput - The return type for the analyzeBanReasoning function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeBanReasoningInputSchema = z.object({
  banReason: z
    .string()
    .describe('The stated reason for the Free Fire account ban.'),
  appealAttempts: z
    .number()
    .describe(
      'The number of previous attempts made to appeal the ban (0 if none).'
    ),
  accountValue: z
    .string()
    .describe(
      'The perceived emotional and/or financial value of the account to the user (e.g., high, medium, low).'
    ),
  violationPerception: z
    .string()
    .describe(
      'The user perception of whether the violation was intentional or not (e.g., intentional, unintentional, unclear).'
    ),
});
export type AnalyzeBanReasoningInput = z.infer<typeof AnalyzeBanReasoningInputSchema>;

const AnalyzeBanReasoningOutputSchema = z.object({
  recoveryLikelihood: z
    .string()
    .describe(
      'An assessment of the likelihood of account recovery (e.g., high, medium, low), based on the provided information and patterns of successful appeals.'
    ),
  analysisDetails: z
    .string()
    .describe(
      'Detailed analysis of the ban reason, comparison against successful appeal patterns, and factors influencing the recovery likelihood.'
    ),
});
export type AnalyzeBanReasoningOutput = z.infer<typeof AnalyzeBanReasoningOutputSchema>;

export async function analyzeBanReasoning(
  input: AnalyzeBanReasoningInput
): Promise<AnalyzeBanReasoningOutput> {
  return analyzeBanReasoningFlow(input);
}

const analyzeBanReasoningPrompt = ai.definePrompt({
  name: 'analyzeBanReasoningPrompt',
  input: {schema: AnalyzeBanReasoningInputSchema},
  output: {schema: AnalyzeBanReasoningOutputSchema},
  prompt: `You are an AI assistant specialized in analyzing Free Fire account ban reasons and assessing the likelihood of account recovery.

  Based on the following information provided by the user:
  - Ban Reason: {{{banReason}}}
  - Appeal Attempts: {{{appealAttempts}}}
  - Account Value: {{{accountValue}}}
  - Violation Perception: {{{violationPerception}}}

  Compare the provided ban reason against patterns of successful appeals and assess the likelihood of recovery.
  Consider factors such as the number of previous appeal attempts, the perceived value of the account, and the user's perception of the violation.

  Provide a detailed analysis of the ban reason, comparison against successful appeal patterns, and factors influencing the recovery likelihood in the analysisDetails field.
  Assess the overall likelihood of account recovery (high, medium, or low) and provide it in the recoveryLikelihood field.

  Ensure the response is professional, ethical, and avoids any guarantees of recovery or claims of access to internal Garena systems.
`,
});

const analyzeBanReasoningFlow = ai.defineFlow(
  {
    name: 'analyzeBanReasoningFlow',
    inputSchema: AnalyzeBanReasoningInputSchema,
    outputSchema: AnalyzeBanReasoningOutputSchema,
  },
  async input => {
    const {output} = await analyzeBanReasoningPrompt(input);
    return output!;
  }
);
