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
    <div className="flex items-center gap-3">
      <div className="relative">
        <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent 
          [text-shadow:_0_1px_12px_rgb(37_99_235_/_20%)] relative z-10">
          EMOTION
        </span>
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-lg rounded-lg" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-2xl animate-pulse transform hover:scale-110 transition-transform duration-200 cursor-default">
          {emoji}
        </span>
        <span className="text-2xl font-black tracking-tighter bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
          AI
        </span>
      </div>
    </div>
  );
};