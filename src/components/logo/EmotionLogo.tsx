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
      <div className="bg-card border border-border rounded-xl px-4 py-2">
        <div className="relative">
          <span className="text-2xl font-black tracking-normal bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] bg-clip-text text-transparent 
            relative z-10 font-display uppercase">
            PELIOS
          </span>
          <div className="absolute -inset-1 bg-gradient-to-r from-[#4F46E5]/20 to-[#7C3AED]/20 blur-lg rounded-lg" />
        </div>
      </div>
      <div className="flex items-center">
        <span className="text-2xl transform hover:scale-110 transition-transform duration-200 cursor-default opacity-80">
          {emoji}
        </span>
      </div>
    </div>
  );
};