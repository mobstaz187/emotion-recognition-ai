import * as faceapi from 'face-api.js';
import { MODEL_URLS } from './constants';
import { modelState } from './state';

async function loadFromUrl(url: string): Promise<boolean> {
  try {
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(url),
      faceapi.nets.faceExpressionNet.loadFromUri(url)
    ]);
    return true;
  } catch (error) {
    console.warn(`Failed to load models from ${url}, trying next source...`);
    return false;
  }
}

export async function loadModels(): Promise<void> {
  if (modelState.modelsLoaded || modelState.isLoading) return;

  modelState.isLoading = true;
  modelState.error = null;

  try {
    for (let i = modelState.currentUrlIndex; i < MODEL_URLS.length; i++) {
      const success = await loadFromUrl(MODEL_URLS[i]);
      if (success) {
        modelState.modelsLoaded = true;
        modelState.currentUrlIndex = i;
        return;
      }
    }
    throw new Error('Failed to load models from all available sources');
  } catch (error) {
    modelState.error = error as Error;
    throw error;
  } finally {
    modelState.isLoading = false;
  }
}