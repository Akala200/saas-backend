// src/controllers/auth.controller.ts

import { Request, Response } from 'express';
import { z } from 'zod';
import { registerUser, loginUser, getUserById } from '../services/auth.service';
import { AuthenticatedRequest } from '../middleware/auth.middleware';



const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    const token = await registerUser(email, password, name);
    res.status(201).json({ token });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const token = await loginUser(email, password);
    res.json(token);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getCurrentUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    console.log('User ID from token:', userId);
    if (!userId) return res.status(400).json({ message: 'User ID not found in token' });

    const user = await getUserById(userId);
    res.json(user);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};
