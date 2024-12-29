export const MODEL_URLS = [
  '/emotion-recognition-ai/models',  // GitHub Pages path
  '/models',  // Local development path
  'https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/',
  'https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@master/weights/',
];

export const DETECTION_CONFIG = {
  inputSize: 512,
  scoreThreshold: 0.2,
  maxRetries: 3,
  retryDelay: 1000,
};