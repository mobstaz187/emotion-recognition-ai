import React from 'react';
import { DetectedFace } from '../types/emotion';
import { EmotionCircle } from './EmotionCircle';

interface Props {
  detections: DetectedFace[];
}

export const EmotionResults: React.FC<Props> = ({ detections }) => {
  return (
    <div className="w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      {detections.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No faces detected</p>
      ) : (
        <div className="space-y-6">
          {detections.map((detection, index) => (
            <div 
              key={index}
              className="flex flex-col items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700"
            >
              <EmotionCircle detection={detection} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}