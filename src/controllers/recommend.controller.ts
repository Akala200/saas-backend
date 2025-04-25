// src/controllers/recommendation.controller.ts
import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import { generateRecommendations } from '../services/recommend.service';

export const recommend = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  const recommendations = await generateRecommendations(userId);
  res.json(recommendations);
};
