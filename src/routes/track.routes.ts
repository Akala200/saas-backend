// routes/track.routes.ts
import { Router } from 'express';
import { trackUserInteraction } from '../controllers/track.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { trackSchema } from '../validations/track.validation';
import { validateBody } from '../validations/validate';

const trackRoutes = Router();
//trackSchema
// Endpoint to log user interactions
trackRoutes.post('', authenticateToken, validateBody(trackSchema), trackUserInteraction);

export default trackRoutes;
