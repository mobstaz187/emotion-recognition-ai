export function validateImage(image: HTMLImageElement | HTMLVideoElement): boolean {
  if (!image) {
    return false;
  }

  // For images
  if (image instanceof HTMLImageElement) {
    return image.complete && image.naturalWidth > 0;
  }

  // For video
  if (image instanceof HTMLVideoElement) {
    return image.readyState >= 2 && image.videoWidth > 0;
  }

  return false;
}