import { DetectedFace, EmotionMap } from '../../types/emotion';
import { FaceDetection, FaceExpressions } from 'face-api.js';

export function normalizeDetections(
  detections: Array<{
    detection: FaceDetection;
    expressions: FaceExpressions;
  }>
): DetectedFace[] {
  return detections.map(detection => ({
    expressions: normalizeExpressions(detection.expressions),
    detection: {
      box: {
        x: Math.max(0, detection.detection.box.x),
        y: Math.max(0, detection.detection.box.y),
        width: detection.detection.box.width,
        height: detection.detection.box.height
      }
    }
  }));
}

function normalizeExpressions(expressions: FaceExpressions): EmotionMap {
  const total = Object.values(expressions).reduce((sum, val) => sum + val, 0);
  
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