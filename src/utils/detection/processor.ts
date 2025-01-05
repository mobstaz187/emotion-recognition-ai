import * as faceapi from 'face-api.js';
import { DETECTION_CONFIG } from '../modelLoader/constants';
import type { ProcessedDetection, NormalizedDetection } from '../../types/detection';

export async function processImage(
  image: HTMLImageElement | HTMLVideoElement
): Promise<ProcessedDetection[]> {
  if (!image || !(image instanceof HTMLImageElement || image instanceof HTMLVideoElement)) {
    throw new Error('Invalid image input');
  }

  const width = image instanceof HTMLVideoElement ? image.videoWidth : image.width;
  const height = image instanceof HTMLVideoElement ? image.videoHeight : image.height;
  
  if (!width || !height) {
    throw new Error('Image dimensions not available');
  }

  try {
    const detections = await faceapi
      .detectAllFaces(
        image,
        new faceapi.TinyFaceDetectorOptions({
          inputSize: DETECTION_CONFIG.inputSize,
          scoreThreshold: DETECTION_CONFIG.scoreThreshold
        })
      )
      .withFaceExpressions();

    // Filter out any detections with invalid boxes
    return detections.filter(detection => {
      const box = detection.detection.box;
      return (
        box &&
        typeof box.x === 'number' &&
        typeof box.y === 'number' &&
        typeof box.width === 'number' &&
        typeof box.height === 'number'
      );
    });
  } catch (error) {
    console.error('Face detection processing error:', error);
    throw error;
  }
}

export function normalizeDetection(detection: ProcessedDetection): NormalizedDetection {
  return {
    expressions: detection.expressions,
    detection: {
      box: {
        x: Math.max(0, detection.detection.box.x),
        y: Math.max(0, detection.detection.box.y),
        width: detection.detection.box.width,
        height: detection.detection.box.height
      }
    }
  };
}