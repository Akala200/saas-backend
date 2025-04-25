// src/models/Interaction.ts
import { Schema, model, Document } from 'mongoose';

export interface IInteraction extends Document {
  userId: string;
  contentId: string;
  type: 'view' | 'like' | 'click';
  timestamp: Date;
}

const InteractionSchema = new Schema<IInteraction>(
  {
    userId: { type: String, ref: 'User', required: true },
    contentId: { type: String, ref: 'Content', required: true },
    type: { type: String, enum: ['view', 'like', 'click', 'unlike'], required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Interaction = model<IInteraction>('Interaction', InteractionSchema);
