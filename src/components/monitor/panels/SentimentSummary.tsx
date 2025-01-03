import React from 'react';
import { motion } from 'framer-motion';

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
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-blue-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="bg-black/20 backdrop-blur-xl rounded-xl border border-white/10 p-6">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div>
          <h3 className="text-xl font-semibold">Comprehensive Report</h3>
          <p className="text-gray-400">
            {Math.round(analysis.confidence * 100)}% confidence
          </p>
        </div>

        {/* Sentiment Scores */}
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(sentiment).map(([key, value]) => (
            <motion.div
              key={key}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white/5 rounded-lg p-4 text-center"
            >
              <div className="text-sm text-gray-400 mb-2 capitalize">
                {key} Score
              </div>
              <div className={`text-2xl font-bold ${getScoreColor(value)}`}>
                {value}%
              </div>
            </motion.div>
          ))}
        </div>

        {/* Analysis Summary */}
        <div className="bg-white/5 rounded-lg p-4">
          <p className="text-gray-300">{analysis.reason}</p>
        </div>

        {/* Signal Groups */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {analysis.signals.bearish.length > 0 && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <h4 className="text-red-400 font-medium mb-2">Bearish Signals</h4>
              <ul className="space-y-1">
                {analysis.signals.bearish.map((signal, index) => (
                  <li key={index} className="text-sm text-gray-300 flex items-center gap-2">
                    <span className="text-red-400">↘</span> {signal}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {analysis.signals.neutral.length > 0 && (
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h4 className="text-blue-400 font-medium mb-2">Neutral Signals</h4>
              <ul className="space-y-1">
                {analysis.signals.neutral.map((signal, index) => (
                  <li key={index} className="text-sm text-gray-300 flex items-center gap-2">
                    <span className="text-blue-400">→</span> {signal}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {analysis.signals.bullish.length > 0 && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <h4 className="text-green-400 font-medium mb-2">Bullish Signals</h4>
              <ul className="space-y-1">
                {analysis.signals.bullish.map((signal, index) => (
                  <li key={index} className="text-sm text-gray-300 flex items-center gap-2">
                    <span className="text-green-400">↗</span> {signal}
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