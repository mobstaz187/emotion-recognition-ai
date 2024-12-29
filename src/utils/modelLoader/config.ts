import type { ModelLoaderConfig } from './types';

export const DEFAULT_CONFIG: ModelLoaderConfig = {
  inputSize: 416,
  scoreThreshold: 0.3,
  maxRetries: 3,
  retryDelay: 1000,
};