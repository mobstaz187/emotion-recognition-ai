import * as faceapi from 'face-api.js';
import { DETECTION_CONFIG } from '../modelLoader/constants';
import { ProcessedDetection } from '../../types/emotion';

export async function processImage(
  image: HTMLImageElement | HTMLVideoElement
): Promise<ProcessedDetection[]> {
  if (!image || !(image instanceof HTMLImageElement || image instanceof HTMLVideoElement)) {
    throw new Error('Invalid image input');
  }

  const canvas = document.createElement('canvas');
  const width = image instanceof HTMLVideoElement ? image.videoWidth : image.width;
  const height = image instanceof HTMLVideoElement ? image.videoHeight : image.height;
  
  if (!width || !height) {
    throw new Error('Image dimensions not available');
  }

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get canvas context');
  
  try {
    ctx.drawImage(image, 0, 0);

    const detections = await faceapi
      .detectAllFaces(
        canvas,
        new faceapi.TinyFaceDetectorOptions({
          inputSize: DETECTION_CONFIG.inputSize,
          scoreThreshold: DETECTION_CONFIG.scoreThreshold
        })
      )
      .withFaceExpressions();

    return detections || [];
  } catch (error) {
    console.error('Face detection processing error:', error);
    throw error;
  } finally {
    // Clean up
    ctx.clearRect(0, 0, width, height);
  }
}