// Custom error types for face detection
export class ModelLoadError extends Error {
  constructor(message = 'Failed to load face detection models') {
    super(message);
    this.name = 'ModelLoadError';
  }
}

export class DetectionError extends Error {
  constructor(message = 'Face detection failed') {
    super(message);
    this.name = 'DetectionError';
  }
}

export class ValidationError extends Error {
  constructor(message = 'Invalid input for face detection') {
    super(message);
    this.name = 'ValidationError';
  }
}