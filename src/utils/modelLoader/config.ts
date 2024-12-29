import { ModelLoaderConfig } from './types';

export const MODEL_URLS: string[] = [
  '/models',  // Local models first
  'https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/',  // Most reliable CDN first
  'https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@master/weights/',
  'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/'
];

export const DEFAULT_CONFIG: ModelLoaderConfig = {
  inputSize: 416, // Increased for better detection
  scoreThreshold: 0.3, // Lower threshold for better detection
  maxRetries: 3,
  retryDelay: 1000,
};