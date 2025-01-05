import { DetectedFace } from '../../types/emotion';
import { loadModels } from '../modelLoader/loader';
import { modelState } from '../modelLoader/state';
import { DETECTION_CONFIG } from '../modelLoader/constants';
import { processImage, normalizeDetection } from './processor';
import { normalizeEmotions } from '../emotionNormalization';

export async function detectEmotions(
  image: HTMLImageElement | HTMLVideoElement,
  retryCount = 0
): Promise<DetectedFace[]> {
  try {
    if (!modelState.modelsLoaded) {
      await loadModels();
    }

    const detections = await processImage(image);

    if (!detections || detections.length === 0) {
      if (retryCount < DETECTION_CONFIG.maxRetries) {
        await new Promise(resolve => setTimeout(resolve, DETECTION_CONFIG.retryDelay));
        return detectEmotions(image, retryCount + 1);
      }
      return [];
    }

    return detections.map(detection => {
      const normalized = normalizeDetection(detection);
      return {
        expressions: normalizeEmotions(normalized.expressions),
        detection: normalized.detection
      };
    });
  } catch (error) {
    console.error('Face detection error:', error);
    if (retryCount < DETECTION_CONFIG.maxRetries) {
      await new Promise(resolve => setTimeout(resolve, DETECTION_CONFIG.retryDelay));
      return detectEmotions(image, retryCount + 1);
    }
    throw new Error('Face detection failed after multiple retries');
  }
}