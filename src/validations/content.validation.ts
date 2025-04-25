// src/validation/content.validation.ts
import { z } from 'zod';

export const contentSchema = z.object({
  title: z.string().min(1),
  type: z.enum(['text', 'image', 'link']),
  data: z.string().min(1),
  tags: z.array(z.string()).optional(),
});