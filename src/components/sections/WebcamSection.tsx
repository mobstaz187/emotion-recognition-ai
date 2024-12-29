import React from 'react';
import Webcam from 'react-webcam';
import { useEmotionDetection } from '../../hooks/useEmotionDetection';
import { useEmotionContext } from '../../contexts/EmotionContext';
import { useWebcam } from '../../contexts/WebcamContext';
import { WebcamControls } from '../WebcamControls';

interface Props {
  isActive: boolean;
  onToggle: () => void;
}

export const WebcamSection: React.FC<Props> = ({ isActive, onToggle }) => {
  const webcamRef = React.useRef<Webcam>(null);
  const { setDetections } = useEmotionContext();
  const { isWebcamOn } = useWebcam();
  const { isLoading, error } = useEmotionDetection(webcamRef, isActive && isWebcamOn, setDetections);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Live Analysis</h2>
          <WebcamControls 
            isAnalyzing={isActive}
            onToggleAnalysis={onToggle}
            isProcessing={isLoading}
          />
        </div>
      </div>
      <div className="relative aspect-video">
        {isWebcamOn ? (
          <>
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-full h-full object-cover"
              videoConstraints={{
                width: 1280,
                height: 720,
                facingMode: "user"
              }}
            />
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="text-white text-lg">Loading models...</div>
              </div>
            )}
            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="text-white text-lg bg-red-500 p-4 rounded-lg">
                  {error}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gray-900 flex items-center justify-center">
            <p className="text-white text-lg">Click "Turn On Camera" to start</p>
          </div>
        )}
      </div>
    </div>
  );
};