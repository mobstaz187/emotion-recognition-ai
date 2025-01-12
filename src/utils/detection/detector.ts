import * as faceapi from 'face-api.js';
import { DetectedFace } from '../../types/emotion';
import { validateDetectionInput } from './validation';
import { ModelLoadError, DetectionError } from './errors';
import { loadModels } from '../modelLoader/loader';
import { modelState } from '../modelLoader/state';
import { DEFAULT_CONFIG } from '../modelLoader/config';
import { normalizeDetections } from './normalizer';

export async function detectEmotions(
  image: HTMLImageElement | HTMLVideoElement,
  retryCount = 0
): Promise<DetectedFace[]> {
  try {
    // Validate input
    validateDetectionInput(image);

    // Ensure models are loaded
    if (!modelState.modelsLoaded) {
      try {
        await loadModels();
      } catch (error) {
        throw new ModelLoadError();
      }
    }

    // Wait for image to be fully loaded
    if (image instanceof HTMLImageElement && !image.complete) {
      await new Promise(resolve => {
        image.onload = resolve;
      });
    }

    // Ensure valid dimensions
    const width = image instanceof HTMLVideoElement ? image.videoWidth : image.width;
    const height = image instanceof HTMLVideoElement ? image.videoHeight : image.height;
    
    if (!width || !height) {
      throw new Error('Invalid image dimensions');
    }

    // Perform detection with error handling
    const detections = await faceapi
      .detectAllFaces(
        image,
        new faceapi.TinyFaceDetectorOptions({
          inputSize: DEFAULT_CONFIG.inputSize,
          scoreThreshold: DEFAULT_CONFIG.scoreThreshold
        })
      )
      .withFaceExpressions();

    // Validate detections
    if (!detections || !Array.isArray(detections)) {
      throw new Error('Invalid detection results');
    }

    // Filter out invalid detections
    const validDetections = detections.filter(detection => 
      detection?.detection?.box &&
      typeof detection.detection.box.x === 'number' &&
      typeof detection.detection.box.y === 'number' &&
      typeof detection.detection.box.width === 'number' &&
      typeof detection.detection.box.height === 'number'
    );

    // Handle no valid detections case
    if (validDetections.length === 0) {
      if (retryCount < DEFAULT_CONFIG.maxRetries) {
        await new Promise(resolve => setTimeout(resolve, DEFAULT_CONFIG.retryDelay));
        return detectEmotions(image, retryCount + 1);
      }
      return [];
    }

    // Normalize and return results
    return normalizeDetections(validDetections);
  } catch (error) {
    if (error instanceof ModelLoadError || error instanceof DetectionError) {
      throw error;
    }
    
    if (retryCount < DEFAULT_CONFIG.maxRetries) {
      await new Promise(resolve => setTimeout(resolve, DEFAULT_CONFIG.retryDelay));
      return detectEmotions(image, retryCount + 1);
    }
    
    console.error('Face detection error:', error);
    return []; // Return empty array instead of throwing to prevent UI disruption
  }
}