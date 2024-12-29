import type { FaceDetection, FaceExpressions } from 'face-api.js';

export type EmotionType = 'angry' | 'disgusted' | 'fearful' | 'happy' | 'neutral' | 'sad' | 'surprised';

export interface EmotionMap {
  [key: string]: number;
  angry: number;
  disgusted: number;
  fearful: number;
  happy: number;
  neutral: number;
  sad: number;
  surprised: number;
}

export interface DetectedFace {
  expressions: EmotionMap;
  detection: {
    box: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
  };
}

export interface ProcessedDetection {
  expressions: FaceExpressions;
  detection: FaceDetection;
}