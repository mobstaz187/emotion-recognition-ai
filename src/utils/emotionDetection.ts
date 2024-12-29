import * as faceapi from 'face-api.js';
import { DetectedFace } from '../types/emotion';
import { validateImage } from './imageValidation';
import { normalizeEmotions } from './emotionNormalization';
import { areModelsLoaded, loadModels } from './modelLoader';

export async function detectEmotions(image: HTMLImageElement | HTMLVideoElement): Promise<DetectedFace[]> {
  try {
    if (!validateImage(image)) {
      throw new Error('Invalid image input');
    }

    if (!areModelsLoaded()) {
      await loadModels();
    }

    const detections = await faceapi
      .detectAllFaces(image, new faceapi.TinyFaceDetectorOptions({ inputSize: 224 }))
      .withFaceExpressions();

    if (!detections || detections.length === 0) {
      return [];
    }

    return detections.map(detection => ({
      expressions: normalizeEmotions(detection.expressions),
      detection: {
        box: {
          x: detection.detection.box.x,
          y: detection.detection.box.y,
          width: detection.detection.box.width,
          height: detection.detection.box.height
        }
      }
    }));
  } catch (error) {
    console.error('Face detection error:', error);
    throw error;
  }
}