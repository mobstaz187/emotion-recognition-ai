import React from 'react';
import { DetectedFace } from '../types/emotion';
import { getDominantEmotion } from '../utils/emotionAnalysis';
import { getEmotionColor } from '../utils/emotionColors';

interface Props {
  detection: DetectedFace;
  style?: React.CSSProperties;
}

export const EmotionBadge: React.FC<Props> = ({ detection, style }) => {
  const dominantEmotion = getDominantEmotion(detection.expressions);
  const confidence = Math.round(detection.expressions[dominantEmotion] * 100);

  return (
    <div
      className="px-2 py-1 rounded-full text-white text-sm font-semibold shadow-md"
      style={{
        backgroundColor: getEmotionColor(dominantEmotion),
        ...style
      }}
    >
      {dominantEmotion} ({confidence}%)
    </div>
  );
};