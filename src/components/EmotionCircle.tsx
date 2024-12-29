import React from 'react';
import { DetectedFace } from '../types/emotion';
import { getDominantEmotion } from '../utils/emotionAnalysis';
import { getEmotionColor } from '../utils/emotionColors';
import { getEmotionEmoji } from '../utils/emotionEmojis';

interface Props {
  detection: DetectedFace;
}

export const EmotionCircle: React.FC<Props> = ({ detection }) => {
  const dominantEmotion = getDominantEmotion(detection.expressions);
  const confidence = detection.expressions[dominantEmotion];
  const emoji = getEmotionEmoji(dominantEmotion);
  const color = getEmotionColor(dominantEmotion);
  
  const size = 120;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = confidence * circumference;
  const dashArray = `${progress} ${circumference}`;

  return (
    <div className="relative w-30 h-30">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-gray-200 dark:text-gray-700"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={dashArray}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      <div 
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ color }}
      >
        <span className="text-3xl">{emoji}</span>
        <span className="text-sm font-medium capitalize mt-1">{dominantEmotion}</span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {Math.round(confidence * 100)}%
        </span>
      </div>
    </div>
  );
};