// src/config.ts
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET;
export const MONGO_URI = process.env.MONGO_URI;
