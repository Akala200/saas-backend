// src/models/User.ts
import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  preferences?: string[]; // tags, categories, etc.
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    preferences: [{ type: String }],
  },
  { timestamps: true }
);

export const User = model<IUser>('User', UserSchema);