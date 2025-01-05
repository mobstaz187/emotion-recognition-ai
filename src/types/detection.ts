import type { FaceDetection, FaceExpressions } from 'face-api.js';

export interface DetectionBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ProcessedDetection {
  expressions: FaceExpressions;
  detection: FaceDetection;
}

export interface NormalizedDetection {
  expressions: FaceExpressions;
  detection: {
    box: DetectionBox;
  };
}