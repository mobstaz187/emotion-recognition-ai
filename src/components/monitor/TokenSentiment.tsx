import React from 'react';
import { TokenData } from '../../types/token';
import { analyzeSentiment } from '../../utils/sentiment/analysis';
import { getEmotionColor } from '../../utils/emotionColors';
import { getEmotionEmoji } from '../../utils/emotionEmojis';

interface Props {
  data: TokenData;
}

export const TokenSentiment: React.FC<Props> = ({ data }) => {
  const sentiment = analyzeSentiment(data);
  const color = getEmotionColor(sentiment.emotion);
  const emoji = getEmotionEmoji(sentiment.emotion);

  return (
    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
      <h3 className="text-lg font-semibold text-gray-200 mb-4">Market Sentiment</h3>
      
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{emoji}</span>
        <div>
          <p className="text-xl font-semibold capitalize" style={{ color }}>
            {sentiment.emotion}
          </p>
          <p className="text-sm text-gray-400">
            {Math.round(sentiment.confidence * 100)}% confidence
          </p>
        </div>
      </div>
      
      <p className="text-gray-300 text-sm">
        {sentiment.reason}
      </p>
    </div>
  );
};