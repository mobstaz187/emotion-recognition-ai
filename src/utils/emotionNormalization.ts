import { EmotionMap } from '../types/emotion';
import { FaceExpressions } from 'face-api.js';

export function normalizeEmotions(expressions: FaceExpressions): EmotionMap {
  const total = Object.values(expressions).reduce((sum, score) => sum + score, 0);
  
  if (total === 0) {
    return {
      angry: 0,
      disgusted: 0,
      fearful: 0,
      happy: 0,
      neutral: 1,
      sad: 0,
      surprised: 0
    };
  }

  return {
    angry: expressions.angry / total,
    disgusted: expressions.disgusted / total,
    fearful: expressions.fearful / total,
    happy: expressions.happy / total,
    neutral: expressions.neutral / total,
    sad: expressions.sad / total,
    surprised: expressions.surprised / total
  };
}