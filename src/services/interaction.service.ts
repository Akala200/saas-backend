// --- Track Service ---
import { Interaction } from '../models/engagement.model';

/**
 * Log a new user interaction with content (e.g., view, like, click, unlike).
 */
export const logUserInteraction = async (
  userId: string,
  contentId: string,
  type: 'view' | 'like' | 'click' | 'unlike'
) => {
  return await Interaction.create({ userId, contentId, type });
};

/**
 * Get all or user-specific interactions.
 */
export const getUserContentInteractions = async (userId?: string) => {
  if (userId) {
    return await Interaction.find({ userId });
  }
  return await Interaction.find(); // For training all-user model
};
