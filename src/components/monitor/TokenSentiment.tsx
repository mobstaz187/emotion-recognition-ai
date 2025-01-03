import React from 'react';
import { TokenData } from '../../types/token';
import { analyzeSentiment } from '../../utils/sentiment/analysis';
import { getEmotionColor } from '../../utils/emotionColors';
import { SentimentIcon } from './SentimentIcon';

interface Props {
  data: TokenData;
}

export const TokenSentiment: React.FC<Props> = ({ data }) => {
  const sentiment = analyzeSentiment(data);
  const color = getEmotionColor(sentiment.emotion);

  return (
    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
      <h3 className="text-lg font-semibold text-gray-200 mb-4">Market Sentiment</h3>
      
      <div className="flex items-center gap-3 mb-4">
        <SentimentIcon emotion={sentiment.emotion} className="w-8 h-8" color={color} />
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