import * as faceapi from 'face-api.js';
import { DetectedFace } from '../../types/emotion';
import { validateImage } from '../imageValidation';
import { normalizeEmotions } from '../emotionNormalization';
import { loadModels } from '../modelLoader/loader';
import { modelState } from '../modelLoader/state';
import { DEFAULT_CONFIG } from '../modelLoader/config';

export async function detectEmotions(
  image: HTMLImageElement | HTMLVideoElement,
  retryCount = 0
): Promise<DetectedFace[]> {
  try {
    if (!validateImage(image)) {
      throw new Error('Invalid image input');
    }

    if (!modelState.modelsLoaded) {
      await loadModels();
    }

    const canvas = document.createElement('canvas');
    canvas.width = image instanceof HTMLVideoElement ? image.videoWidth : image.width;
    canvas.height = image instanceof HTMLVideoElement ? image.videoHeight : image.height;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Failed to get canvas context');
    
    ctx.drawImage(image, 0, 0);

    const detections = await faceapi
      .detectAllFaces(
        canvas, 
        new faceapi.TinyFaceDetectorOptions({
          inputSize: DEFAULT_CONFIG.inputSize,
          scoreThreshold: DEFAULT_CONFIG.scoreThreshold
        })
      )
      .withFaceExpressions();

    if (!detections || detections.length === 0) {
      if (retryCount < DEFAULT_CONFIG.maxRetries) {
        await new Promise(resolve => setTimeout(resolve, DEFAULT_CONFIG.retryDelay));
        return detectEmotions(image, retryCount + 1);
      }
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
    if (retryCount < DEFAULT_CONFIG.maxRetries) {
      await new Promise(resolve => setTimeout(resolve, DEFAULT_CONFIG.retryDelay));
      return detectEmotions(image, retryCount + 1);
    }
    console.error('Face detection error:', error);
    throw error;
  }
}