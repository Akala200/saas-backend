import { Request, Response } from 'express';
import * as ContentService from '../services/content.service';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

export const create = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }
  const content = await ContentService.createContent(req.body, userId);
  res.status(201).json(content);
};

export const list = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  const content = await ContentService.getAllContent(userId);
  res.json(content);
};

export const get = async (req: Request, res: Response) => {
  const content = await ContentService.getContentById(req.params.id);
  res.json(content);
};

export const update = async (req: Request, res: Response) => {
  const content = await ContentService.updateContent(req.params.id, req.body);
  res.json(content);
};

export const remove = async (req: Request, res: Response) => {
  await ContentService.deleteContent(req.params.id);
  res.status(204).send();
};