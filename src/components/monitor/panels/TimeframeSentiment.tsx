import React from 'react';
import { motion } from 'framer-motion';
import { TimeSentimentAnalysis } from '../../../types/timeframe';
import { getEmotionColor } from '../../../utils/emotionColors';
import { SentimentIcon } from '../SentimentIcon';

const formatTimeframe = (timeframe: string): string => {
  switch (timeframe) {
    case '1m': return '1 minute';
    case '15m': return '15 minutes';
    case '30m': return '30 minutes';
    case '1h': return '1 hour';
    case '4h': return '4 hours';
    case '24h': return '24 hours';
    default: return timeframe;
  }
};

interface Props {
  sentiments: TimeSentimentAnalysis;
}

export const TimeframeSentiment: React.FC<Props> = ({ sentiments }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {Object.entries(sentiments).map(([timeframe, sentiment], index) => {
        const color = getEmotionColor(sentiment.emotion as any);
        
        return (
          <motion.div
            key={timeframe}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-background/50 backdrop-blur-xl rounded-lg p-4 border border-border"
            style={{
              borderColor: `${color}40`
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <SentimentIcon 
                emotion={sentiment.emotion as any} 
                className="w-6 h-6" 
                color={color}
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">
                  {formatTimeframe(timeframe)}
                </span>
                <span className="text-sm capitalize" style={{ color }}>
                  {sentiment.emotion}
                </span>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Confidence: {Math.round(sentiment.confidence * 100)}%
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};