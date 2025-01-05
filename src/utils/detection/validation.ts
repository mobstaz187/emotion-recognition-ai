export function validateDetectionInput(image: HTMLImageElement | HTMLVideoElement): void {
  if (!image) {
    throw new Error('No image provided');
  }

  if (image instanceof HTMLImageElement && (!image.complete || !image.naturalWidth)) {
    throw new Error('Image not fully loaded');
  }

  if (image instanceof HTMLVideoElement && (!image.videoWidth || !image.videoHeight)) {
    throw new Error('Video dimensions not available');
  }
}