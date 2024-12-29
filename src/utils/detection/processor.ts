import * as faceapi from 'face-api.js';
import { DETECTION_CONFIG } from '../modelLoader/constants';
import { ProcessedDetection } from '../../types/emotion';

export async function processImage(
  image: HTMLImageElement | HTMLVideoElement
): Promise<ProcessedDetection[]> {
  const canvas = document.createElement('canvas');
  const width = image instanceof HTMLVideoElement ? image.videoWidth : image.width;
  const height = image instanceof HTMLVideoElement ? image.videoHeight : image.height;
  
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get canvas context');
  
  ctx.drawImage(image, 0, 0);

  return faceapi
    .detectAllFaces(
      canvas,
      new faceapi.TinyFaceDetectorOptions({
        inputSize: DETECTION_CONFIG.inputSize,
        scoreThreshold: DETECTION_CONFIG.scoreThreshold
      })
    )
    .withFaceExpressions();
}