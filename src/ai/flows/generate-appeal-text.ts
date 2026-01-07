'use server';

/**
 * @fileOverview A flow to generate a personalized appeal message based on user quiz answers and AI analysis.
 *
 * - generateAppealText - A function that generates the appeal text.
 * - GenerateAppealTextInput - The input type for the generateAppealText function.
 * - GenerateAppealTextOutput - The return type for the generateAppealText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAppealTextInputSchema = z.object({
  banReason: z.string().describe('The reason provided for the ban.'),
  appealAttempts: z.string().describe('The number of previous appeal attempts.'),
  accountValue: z.string().describe('The user-perceived value of the account (emotional/financial).'),
  violationPerception: z.string().describe('The user perception on the violation (intentional or not).'),
  accountId: z.string().describe('The Free Fire account ID.'),
  analysisResult: z
    .string()
    .describe('The analysis result from the data analysis engine.'),
});
export type GenerateAppealTextInput = z.infer<typeof GenerateAppealTextInputSchema>;

const GenerateAppealTextOutputSchema = z.object({
  appealText: z.string().describe('The generated appeal text.'),
});
export type GenerateAppealTextOutput = z.infer<typeof GenerateAppealTextOutputSchema>;

export async function generateAppealText(input: GenerateAppealTextInput): Promise<GenerateAppealTextOutput> {
  return generateAppealTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAppealTextPrompt',
  input: {schema: GenerateAppealTextInputSchema},
  output: {schema: GenerateAppealTextOutputSchema},
  prompt: `You are an expert in crafting appeal messages for banned Free Fire accounts. Use the information provided to generate a persuasive and professional appeal message. The message should be tailored to the user's specific situation, highlighting any potential misunderstandings or unintentional violations of the platform's policies.

Ban Reason: {{{banReason}}}
Appeal Attempts: {{{appealAttempts}}}
Account Value: {{{accountValue}}}
Violation Perception: {{{violationPerception}}}
Account ID: {{{accountId}}}
Analysis Result: {{{analysisResult}}}

Appeal Text:`,
});

const generateAppealTextFlow = ai.defineFlow(
  {
    name: 'generateAppealTextFlow',
    inputSchema: GenerateAppealTextInputSchema,
    outputSchema: GenerateAppealTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
