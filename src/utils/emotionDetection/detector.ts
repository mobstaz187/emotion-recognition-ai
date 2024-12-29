import * as faceapi from 'face-api.js';
import { DetectedFace } from '../../types/emotion';
import { validateImage } from '../imageValidation';
import { normalizeEmotions } from '../emotionNormalization';
import { loadModels, state, DEFAULT_CONFIG } from '../modelLoader';

export async function detectEmotions(
  image: HTMLImageElement | HTMLVideoElement,
  retryCount = 0
): Promise<DetectedFace[]> {
  try {
    if (!validateImage(image)) {
      throw new Error('Invalid image input');
    }

    if (!state.modelsLoaded) {
      await loadModels();
    }

    // Create a canvas element for processing
    const canvas = document.createElement('canvas');
    canvas.width = image.width || (image as HTMLVideoElement).videoWidth;
    canvas.height = image.height || (image as HTMLVideoElement).videoHeight;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Failed to get canvas context');
    
    // Draw the image/video frame to canvas
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
        box: detection.detection.box
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