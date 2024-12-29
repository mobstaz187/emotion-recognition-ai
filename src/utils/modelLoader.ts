import * as faceapi from 'face-api.js';

const MODEL_URLS = [
  '/models',  // Try local models first
  'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/',
  'https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@master/weights/',
  'https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/'
];

let modelsLoaded = false;
let currentUrlIndex = 0;
let loadingPromise: Promise<boolean> | null = null;

async function loadFromCurrentUrl() {
  const currentUrl = MODEL_URLS[currentUrlIndex];
  
  try {
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(currentUrl),
      faceapi.nets.faceExpressionNet.loadFromUri(currentUrl)
    ]);
    return true;
  } catch (error) {
    console.warn(`Failed to load from ${currentUrl}`);
    return false;
  }
}

export async function loadModels(): Promise<boolean> {
  if (modelsLoaded) return true;
  
  // Return existing promise if models are currently loading
  if (loadingPromise) return loadingPromise;

  loadingPromise = (async () => {
    while (currentUrlIndex < MODEL_URLS.length) {
      try {
        const success = await loadFromCurrentUrl();
        if (success) {
          modelsLoaded = true;
          return true;
        }
      } catch (error) {
        console.error(`Failed to load models from URL ${currentUrlIndex}`);
      }
      currentUrlIndex++;
    }
    throw new Error('Failed to load models from all available sources');
  })();

  try {
    return await loadingPromise;
  } finally {
    loadingPromise = null;
  }
}

export function areModelsLoaded(): boolean {
  return modelsLoaded;
}

export function resetModelLoader(): void {
  modelsLoaded = false;
  currentUrlIndex = 0;
  loadingPromise = null;
}