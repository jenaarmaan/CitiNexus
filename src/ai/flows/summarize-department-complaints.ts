'use server';

/**
 * @fileOverview Summarizes recent complaints for a specific department.
 *
 * - summarizeDepartmentComplaints - A function that summarizes complaints for a department.
 * - SummarizeDepartmentComplaintsInput - The input type for the summarizeDepartmentComplaints function.
 * - SummarizeDepartmentComplaintsOutput - The return type for the summarizeDepartmentComplaints function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeDepartmentComplaintsInputSchema = z.object({
  department: z.string().describe('The department to summarize complaints for.'),
  complaints: z.array(z.string()).describe('A list of recent complaints for the department.'),
});
export type SummarizeDepartmentComplaintsInput = z.infer<
  typeof SummarizeDepartmentComplaintsInputSchema
>;

const SummarizeDepartmentComplaintsOutputSchema = z.object({
  summary: z.string().describe('A summary of the recent complaints.'),
});
export type SummarizeDepartmentComplaintsOutput = z.infer<
  typeof SummarizeDepartmentComplaintsOutputSchema
>;

export async function summarizeDepartmentComplaints(
  input: SummarizeDepartmentComplaintsInput
): Promise<SummarizeDepartmentComplaintsOutput> {
  return summarizeDepartmentComplaintsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeDepartmentComplaintsPrompt',
  input: {schema: SummarizeDepartmentComplaintsInputSchema},
  output: {schema: SummarizeDepartmentComplaintsOutputSchema},
  prompt: `You are a helpful assistant that summarizes complaints for a specific department.

  Department: {{{department}}}
  Complaints: {{{complaints}}}

  Please provide a concise summary of the recent complaints for the department.
  What are the common themes or issues raised in these complaints?
  What actions, if any, should the department consider taking to solve these themes?
  Make your response concise.
  `,
});

const summarizeDepartmentComplaintsFlow = ai.defineFlow(
  {
    name: 'summarizeDepartmentComplaintsFlow',
    inputSchema: SummarizeDepartmentComplaintsInputSchema,
    outputSchema: SummarizeDepartmentComplaintsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
