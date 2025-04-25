// --- Middleware ---
// src/middlewares/validate.ts
import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

export const validateBody = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error: any) {
    res.status(400).json({ message: error.errors });
  }
};