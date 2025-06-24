'use server';

import {
  classifyComplaint,
  type ClassifyComplaintInput,
} from '@/ai/flows/classify-complaint';
import {
  suggestComplaintTitle,
} from '@/ai/flows/suggest-complaint-title';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const suggestTitleSchema = z.object({
  description: z.string().min(20, 'Please provide a more detailed description (at least 20 characters).'),
});

export async function handleSuggestTitle(data: { description: string }) {
  try {
    const parsed = suggestTitleSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: parsed.error.errors[0].message };
    }
    const result = await suggestComplaintTitle(parsed.data);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to suggest a title. Please try again.' };
  }
}

const classifyComplaintSchema = z.object({
  title: z.string().min(5),
  description: z.string().min(20),
  location: z.string().min(3),
  photoDataUri: z.string().optional(),
  urgencyLevel: z.enum(['Normal', 'Urgent', 'Critical']),
});


export async function handleClassifyComplaint(data: ClassifyComplaintInput) {
    try {
        const parsed = classifyComplaintSchema.safeParse(data);
        if (!parsed.success) {
            return { success: false, error: "Invalid complaint data provided." };
        }
        const result = await classifyComplaint(parsed.data);
        revalidatePath('/citizen/dashboard');
        return { success: true, data: result };
    } catch (error) {
        console.error(error);
        return { success: false, error: 'Failed to classify complaint. Please try again.' };
    }
}
