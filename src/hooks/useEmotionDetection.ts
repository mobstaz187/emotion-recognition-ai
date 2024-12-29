import { useEffect, useState, useRef, RefObject } from 'react';
import Webcam from 'react-webcam';
import { detectEmotions } from '../utils/emotionDetection';
import { DetectedFace } from '../types/emotion';
import { loadModels, areModelsLoaded, resetModelLoader } from '../utils/modelLoader';

export function useEmotionDetection(
  webcamRef: RefObject<Webcam>,
  isStreaming: boolean,
  setGlobalDetections?: (detections: DetectedFace[]) => void
) {
  const [detections, setDetections] = useState<DetectedFace[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const animationFrameId = useRef<number>();
  const retryCount = useRef(0);
  const MAX_RETRIES = 3;

  useEffect(() => {
    let isMounted = true;

    async function detectFrame() {
      if (!webcamRef.current?.video || !isStreaming || !areModelsLoaded()) return;

      try {
        const detected = await detectEmotions(webcamRef.current.video);
        if (isMounted && isStreaming) {
          setDetections(detected);
          setGlobalDetections?.(detected);
          setError(null);
          retryCount.current = 0;
        }
      } catch (error) {
        retryCount.current += 1;
        
        if (retryCount.current >= MAX_RETRIES) {
          setError('Detection failed. Please refresh the page and try again.');
          resetModelLoader();
          return;
        }
      }

      if (isMounted && isStreaming) {
        animationFrameId.current = requestAnimationFrame(detectFrame);
      }
    }

    async function initializeDetection() {
      if (isStreaming && !areModelsLoaded()) {
        setIsLoading(true);
        setError(null);
        try {
          await loadModels();
          if (isMounted) {
            setIsLoading(false);
            detectFrame();
          }
        } catch (error) {
          if (isMounted) {
            setIsLoading(false);
            setError('Failed to load face detection models. Please check your internet connection and refresh the page.');
          }
        }
      } else if (isStreaming) {
        detectFrame();
      } else {
        setDetections([]);
        setGlobalDetections?.([]);
      }
    }

    initializeDetection();

    return () => {
      isMounted = false;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [webcamRef, isStreaming, setGlobalDetections]);

  return { detections, isLoading, error };
}