import React, { useRef } from 'react';
import Webcam from 'react-webcam';
import { useEmotionDetection } from '../hooks/useEmotionDetection';
import { WebcamControls } from './WebcamControls';
import { EmotionResults } from './EmotionResults';

export const WebcamCapture: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [isStreaming, setIsStreaming] = React.useState(false);
  const { detections, isLoading } = useEmotionDetection(webcamRef, isStreaming);

  return (
    <div className="flex gap-6">
      <div className="flex flex-col gap-4">
        {!isStreaming && (
          <WebcamControls 
            isAnalyzing={isStreaming}
            onToggleAnalysis={() => setIsStreaming(!isStreaming)}
            isProcessing={isLoading}
          />
        )}
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="rounded-lg shadow-lg"
          videoConstraints={{
            width: 640,
            height: 480,
            facingMode: "user"
          }}
        />
      </div>
      <div className="fixed right-6 top-24">
        <EmotionResults detections={detections} />
      </div>
    </div>
  );
};