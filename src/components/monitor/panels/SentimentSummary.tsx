import React from 'react';
import { motion } from 'framer-motion';
import { SignalIcon } from '../icons/SignalIcon';
import { SentimentIcon } from '../SentimentIcon';
import { getEmotionColor } from '../../../utils/emotionColors';

interface SentimentAnalysis {
  emotion: string;
  confidence: number;
  reason: string;
  signals: {
    bullish: string[];
    bearish: string[];
    neutral: string[];
  };
}

interface Props {
  sentiment: {
    overall: number;
    technical: number;
    fundamental: number;
  };
  analysis: SentimentAnalysis;
}

export const SentimentSummary: React.FC<Props> = ({ sentiment, analysis }) => {
  const color = getEmotionColor(analysis.emotion as any);

  return (
    <div className="bg-white/80 dark:bg-card/80 backdrop-blur-xl rounded-xl border border-border p-6">
      <div className="flex flex-col space-y-6">
        <h3 className="text-lg font-semibold text-foreground">Technical Score</h3>
        
        {/* Emotion Summary */}
        <div className="flex items-center gap-4">
          <SentimentIcon emotion={analysis.emotion as any} className="w-8 h-8" color={color} />
          <div>
            <h3 className="text-xl font-semibold capitalize" style={{ color }}>
              {analysis.emotion}
            </h3>
            <p className="text-muted-foreground">
              {Math.round(analysis.confidence * 100)}% confidence
            </p>
          </div>
        </div>

        {/* Score Grid */}
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(sentiment).map(([key, value]) => (
            <motion.div
              key={key}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-background rounded-lg p-4 text-center border border-border"
            >
              <div className="text-sm text-muted-foreground mb-2 capitalize">
                {key === 'technical' ? 'Technical Analysis' : `${key} Score`}
              </div>
              <div className={`text-2xl font-bold ${
                value >= 80 ? 'text-green-400' :
                value >= 60 ? 'text-blue-400' :
                value >= 40 ? 'text-yellow-400' :
                'text-red-400'
              }`}>
                {value}%
              </div>
            </motion.div>
          ))}
        </div>

        {/* Signals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {analysis.signals.bearish.length > 0 && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <h4 className="text-red-400 font-medium mb-2">Bearish Signals</h4>
              <ul className="space-y-2">
                {analysis.signals.bearish.map((signal, index) => (
                  <li key={index} className="text-sm text-foreground flex items-center gap-2">
                    <SignalIcon type="bearish" className="w-4 h-4 text-red-400" />
                    {signal}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {analysis.signals.neutral.length > 0 && (
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h4 className="text-blue-400 font-medium mb-2">Neutral Signals</h4>
              <ul className="space-y-2">
                {analysis.signals.neutral.map((signal, index) => (
                  <li key={index} className="text-sm text-foreground flex items-center gap-2">
                    <SignalIcon type="neutral" className="w-4 h-4 text-blue-400" />
                    {signal}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {analysis.signals.bullish.length > 0 && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <h4 className="text-green-400 font-medium mb-2">Bullish Signals</h4>
              <ul className="space-y-2">
                {analysis.signals.bullish.map((signal, index) => (
                  <li key={index} className="text-sm text-foreground flex items-center gap-2">
                    <SignalIcon type="bullish" className="w-4 h-4 text-green-400" />
                    {signal}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};