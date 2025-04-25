// controllers/trackController.ts
import { Response } from 'express';
import { logUserInteraction } from '../services/interaction.service';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

export const trackUserInteraction = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  const { contentId, type } = req.body;
  console.log('interactionType ID:', type);

  if (!userId || !contentId || !type) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const interaction = await logUserInteraction(userId, contentId, type);
    return res.status(201).json(interaction);
  } catch (err: any) {
    return res.status(500).json({ message: 'Error logging interaction', error: err.message });
  }
};
