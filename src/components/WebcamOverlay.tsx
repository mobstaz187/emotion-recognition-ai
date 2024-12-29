import React from 'react';
import { Button } from '@mui/material';
import { DetectedFace } from '../types/emotion';
import { EmotionBadge } from './EmotionBadge';

interface Props {
  detections: DetectedFace[];
  isStreaming: boolean;
  onToggleStream: () => void;
}

export const WebcamOverlay: React.FC<Props> = ({ 
  detections, 
  isStreaming, 
  onToggleStream 
}) => {
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full">
        {detections.map((detection, index) => (
          <EmotionBadge
            key={index}
            detection={detection}
            style={{
              position: 'absolute',
              left: `${detection.detection.box.x}px`,
              top: `${detection.detection.box.y - 30}px`,
            }}
          />
        ))}
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <Button
          variant="contained"
          onClick={onToggleStream}
          className={isStreaming ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}
        >
          {isStreaming ? 'Pause' : 'Resume'}
        </Button>
      </div>
    </>
  );
};