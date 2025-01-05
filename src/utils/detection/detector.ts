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

    // Perform detection
    const detections = await faceapi
      .detectAllFaces(
        image,
        new faceapi.TinyFaceDetectorOptions({
          inputSize: DEFAULT_CONFIG.inputSize,
          scoreThreshold: DEFAULT_CONFIG.scoreThreshold
        })
      )
      .withFaceExpressions();

    // Handle no detections case
    if (!detections || detections.length === 0) {
      if (retryCount < DEFAULT_CONFIG.maxRetries) {
        await new Promise(resolve => setTimeout(resolve, DEFAULT_CONFIG.retryDelay));
        return detectEmotions(image, retryCount + 1);
      }
      return [];
    }

    // Normalize and return results
    return normalizeDetections(detections);
  } catch (error) {
    if (error instanceof ModelLoadError || error instanceof DetectionError) {
      throw error;
    }
    
    if (retryCount < DEFAULT_CONFIG.maxRetries) {
      await new Promise(resolve => setTimeout(resolve, DEFAULT_CONFIG.retryDelay));
      return detectEmotions(image, retryCount + 1);
    }
    
    throw new DetectionError(error instanceof Error ? error.message : 'Unknown detection error');
  }
}