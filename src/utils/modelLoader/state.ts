import { ModelLoaderState } from './types';

export const modelState: ModelLoaderState = {
  modelsLoaded: false,
  currentUrlIndex: 0,
  loadingPromise: null,
  error: null,
  isLoading: false,
};