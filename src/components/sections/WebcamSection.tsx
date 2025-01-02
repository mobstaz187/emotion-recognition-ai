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
    <div className="bg-black/30 dark:bg-gray-900/30 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.3)]">
      <div className="p-4 border-b border-white/10">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-200">Live Analysis</h2>
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
              <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                <div className="text-blue-400 text-lg animate-pulse">Initializing AI Models...</div>
              </div>
            )}
            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                <div className="text-red-400 bg-red-500/20 p-4 rounded-xl border border-red-500/30">
                  {error}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
            <p className="text-gray-400 text-lg">Click "Turn On Camera" to begin analysis</p>
          </div>
        )}
      </div>
    </div>
  );
};