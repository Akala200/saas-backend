import * as tf from '@tensorflow/tfjs-node';
import { getAllContent } from './content.service';
import { getUserContentInteractions } from './interaction.service';

// --- Train a recommendation model based on all user interactions ---
export const trainRecommendationModel = async () => {
  const userContentData = await getUserContentInteractions(); // all interactions
  const contentData = await getAllContent(); // all content

  const interactionMatrix = preprocessUserInteractions(userContentData, contentData);

  const model = createRecommendationModel(interactionMatrix);
  await model.fit(interactionMatrix, interactionMatrix, { epochs: 5 });

  return model;
};

// --- Collaborative filtering NN model ---
const createRecommendationModel = (interactionMatrix: tf.Tensor2D) => {
  const input = tf.input({ shape: [interactionMatrix.shape[1]] });

  const embedding = tf.layers.dense({ units: 64, activation: 'relu' }).apply(input) as tf.SymbolicTensor;
  const output = tf.layers.dense({
    units: interactionMatrix.shape[1],
    activation: 'sigmoid'
  }).apply(embedding) as tf.SymbolicTensor;

  const model = tf.model({ inputs: input, outputs: output });
  model.compile({
    optimizer: 'adam',
    loss: 'binaryCrossentropy'
  });

  return model;
};

// --- Generate top 10 content recommendations for a user ---
export const generateRecommendations = async (userId: string) => {
  const userInteractions = await getUserContentInteractions(userId);
  const contentList = await getAllContent();

  const scores = generateRecommendationScores(userInteractions, contentList);

  return scores
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
};

// --- Score unseen content items (model prediction placeholder) ---
const generateRecommendationScores = (interactions: any[], contentList: any[]) => {
  const seenContentIds = new Set(interactions.map(i => i.contentId.toString()));

  return contentList
    .filter(content => !seenContentIds.has(content._id.toString()))
    .map(content => ({
      contentId: content._id,
      title: content.title,
      score: Math.random() * 10 // placeholder: use model.predict in future
    }));
};

// --- Convert interaction list into a user-content binary matrix ---
const preprocessUserInteractions = (interactions: any[], contentList: any[]) => {
  const users = [...new Set(interactions.map(i => i.userId.toString()))];
  const contents = contentList.map(c => c._id.toString());

  const matrix = users.map(userId => {
    return contents.map(contentId => {
      return interactions.some(i => 
        i.userId.toString() === userId && i.contentId.toString() === contentId && i.type !== 'unlike'
      ) ? 1 : 0;
    });
  });

  return tf.tensor2d(matrix);
};
