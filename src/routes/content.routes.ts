// src/routes/content.routes.ts
import { Router } from 'express';
import * as ContentController from '../controllers/content.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { validateBody } from '../validations/validate';
import { contentSchema } from '../validations/content.validation';

const router = Router();

router.post('/', authenticateToken, validateBody(contentSchema), ContentController.create);
router.get('/', authenticateToken, ContentController.list);
router.get('/:id', authenticateToken, ContentController.get);
router.put('/:id', authenticateToken, ContentController.update);
router.delete('/:id', authenticateToken, ContentController.remove);

export default router;