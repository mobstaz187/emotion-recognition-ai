export interface ModelLoaderConfig {
  inputSize: number;
  scoreThreshold: number;
  maxRetries: number;
  retryDelay: number;
}

export interface ModelLoaderState {
  modelsLoaded: boolean;
  currentUrlIndex: number;
  loadingPromise: Promise<void> | null;
  error: Error | null;
  isLoading: boolean;
}