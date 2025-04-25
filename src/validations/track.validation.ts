// src/validation/track.validation.ts
import { z } from 'zod';

export const trackSchema = z.object({
  contentId: z.string().min(1, { message: 'Content ID is required' }),
  type: z.enum(['view', 'like', 'click', 'unlike'], {
    errorMap: () => ({ message: 'Interaction type must be one of: view, like, click, unlike' })
  }),
});