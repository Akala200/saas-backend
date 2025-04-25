// src/app.ts
import * as express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import authRoutes from './routes/auth.routes';
import contentRoutes from './routes/content.routes';
import trackRoutes from './routes/track.routes';
import recommendRoutes from './routes/recommend.routes';

const app = (express as any).default();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (_: any, res: { send: (arg0: string) => any; }) => res.send('API is live 🚀'));

// Attach routes
app.use('/auth', authRoutes);
app.use('/content', contentRoutes);
app.use('/track', trackRoutes);
app.use('/recommend', recommendRoutes);

export default app;
