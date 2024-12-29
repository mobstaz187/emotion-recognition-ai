import { EmotionType, EmotionMap } from './emotionTypes';

export function getDominantEmotion(expressions: EmotionMap): EmotionType {
  let dominant: EmotionType = 'neutral';
  let maxScore = 0;

  Object.entries(expressions).forEach(([emotion, score]) => {
    if (score > maxScore) {
      maxScore = score;
      dominant = emotion as EmotionType;
    }
  });

  // If no emotion has a strong score, return neutral
  return maxScore < 0.5 ? 'neutral' : dominant;
}