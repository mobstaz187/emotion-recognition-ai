import React from 'react';
import { DetectedFace } from '../types/emotion';
import { getDominantEmotion } from '../utils/emotionAnalysis';
import { getEmotionColor } from '../utils/emotionColors';

interface Props {
  detections: DetectedFace[];
}

export const EmotionDisplay: React.FC<Props> = ({ detections }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">Detected Emotions:</h2>
      <div className="space-y-4">
        {detections.map((detection, index) => {
          const dominantEmotion = getDominantEmotion(detection.expressions);
          const confidence = Math.round(detection.expressions[dominantEmotion] * 100);
          
          return (
            <div 
              key={index}
              className="p-4 rounded-lg shadow-md bg-white"
              style={{ borderLeft: `4px solid ${getEmotionColor(dominantEmotion)}` }}
            >
              <p className="text-lg font-medium capitalize">
                Face {index + 1}: {dominantEmotion}
              </p>
              <p className="text-sm text-gray-600">
                Confidence: {confidence}%
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};