import * as faceapi from 'face-api.js';
import { ProcessedDetection } from '../../types/emotion';
import { DETECTION_CONFIG } from '../modelLoader/constants';

export async function processImage(
  image: HTMLImageElement | HTMLVideoElement
): Promise<ProcessedDetection[]> {
  const detections = await faceapi
    .detectAllFaces(
      image,
      new faceapi.TinyFaceDetectorOptions({
        inputSize: DETECTION_CONFIG.inputSize,
        scoreThreshold: DETECTION_CONFIG.scoreThreshold
      })
    )
    .withFaceExpressions();

  return detections.map(detection => ({
    expressions: detection.expressions,
    detection: detection.detection
  }));
}