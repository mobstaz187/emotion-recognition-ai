import React from 'react';
import Webcam from 'react-webcam';
import { useEmotionDetection } from '../../hooks/useEmotionDetection';
import { useEmotionContext } from '../../contexts/EmotionContext';
import { useWebcam } from '../../contexts/WebcamContext';
import { WebcamControls } from '../WebcamControls';

interface Props {
  isActive: boolean;
  onToggle: () => void;
  isProcessing: boolean;
}

export const WebcamSection: React.FC<Props> = ({ 
  isActive, 
  onToggle,
  isProcessing 
}) => {
  const webcamRef = React.useRef<Webcam>(null);
  const { setDetections } = useEmotionContext();
  const { isWebcamOn } = useWebcam();
  const { isLoading, error } = useEmotionDetection(webcamRef, isActive && isWebcamOn, setDetections);

  return (
    <div className="bg-white/80 dark:bg-card/80 backdrop-blur-xl rounded-2xl border border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-foreground">Live Analysis</h2>
          <WebcamControls 
            isAnalyzing={isActive}
            onToggleAnalysis={onToggle}
            isProcessing={isProcessing}
          />
        </div>
      </div>
      <div className="relative w-[640px] h-[480px]">
        {isWebcamOn ? (
          <>
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-full h-full object-cover"
              videoConstraints={{
                width: 640,
                height: 480,
                facingMode: "user"
              }}
            />
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="text-primary animate-pulse">Initializing AI Models...</div>
              </div>
            )}
            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
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