import { config } from 'dotenv';
config();

import '@/ai/flows/suggest-complaint-title.ts';
import '@/ai/flows/classify-complaint.ts';
import '@/ai/flows/summarize-department-complaints.ts';