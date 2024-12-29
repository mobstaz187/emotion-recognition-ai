import React from 'react';
import { useEmotionContext } from '../../contexts/EmotionContext';
import { getDominantEmotion } from '../../utils/emotionAnalysis';
import { getEmotionEmoji } from '../../utils/emotionEmojis';

export const EmotionLogo: React.FC = () => {
  const { detections } = useEmotionContext();
  
  const currentEmotion = detections.length > 0
    ? getDominantEmotion(detections[0].expressions)
    : 'neutral';
  
  const emoji = getEmotionEmoji(currentEmotion);

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          EMOTION
        </span>
        <span className="text-2xl font-bold ml-2 animate-pulse">
          {emoji}
        </span>
      </div>
      <span className="text-2xl font-bold text-gray-900 dark:text-white">AI</span>
    </div>
  );
};