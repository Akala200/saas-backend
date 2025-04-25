// --- Routes and Validation ---
// src/routes/auth.routes.ts
import { Router } from 'express';
import { getCurrentUser, login, register } from '../controllers/auth.controller';
import { validateBody } from '../validations/validate';
import { authSchema } from '../validations/auth.validation';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.post('/register', validateBody(authSchema), register);
router.post('/login', validateBody(authSchema), login);
router.get('/me', authenticateToken, getCurrentUser);
export default router;
