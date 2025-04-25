// src/models/Content.ts
import { Schema, model, Document } from 'mongoose';

export interface IContent extends Document {
  title: string;
  type: 'text' | 'image' | 'link';
  data: string;
  tags?: string[];
  createdBy: Schema.Types.ObjectId;
}

const ContentSchema = new Schema<IContent>(
  {
    title: { type: String, required: true },
    type: { type: String, enum: ['text', 'image', 'link'], required: true },
    data: { type: String, required: true },
    tags: [{ type: String }],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const Content = model<IContent>('Content', ContentSchema);
