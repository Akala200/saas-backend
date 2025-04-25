// src/routes/recommendation.routes.ts
import { Router } from 'express';
import { recommend } from '../controllers/recommend.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.get('', authenticateToken, recommend);

export default router;