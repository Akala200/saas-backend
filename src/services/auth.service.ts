// src/services/auth.service.ts

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import { JWT_SECRET } from '../config/db'; // Importing the secret

const secret = JWT_SECRET;

export const registerUser = async (email: string, password: string, name: string) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

if (!secret) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ email, password: hashedPassword, name });

  const token = jwt.sign({ id: newUser._id }, secret, { expiresIn: '7d' });
  return token;
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  const token = jwt.sign({ id: user._id }, secret, { expiresIn: '7d' });
  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      preferences: user.preferences,
    },
  };
};

export const getUserById = async (userId: string) => {
  const user = await User.findById(userId).select('-password');
  if (!user) throw new Error('User not found');
  return user;
};

export const getUserPreferences = async (userId: string) => {
  const user = await User.findById(userId);
  return user?.preferences || [];
};
