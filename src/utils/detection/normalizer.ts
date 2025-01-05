import { DetectedFace } from '../../types/emotion';
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

function normalizeExpressions(expressions: FaceExpressions): Record<string, number> {
  const total = Object.values(expressions).reduce((sum, val) => sum + val, 0);
  if (total === 0) return { neutral: 1 };

  return Object.entries(expressions).reduce((acc, [key, value]) => {
    acc[key] = value / total;
    return acc;
  }, {} as Record<string, number>);
}