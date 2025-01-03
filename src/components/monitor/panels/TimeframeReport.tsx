import React from 'react';
import { motion } from 'framer-motion';
import { useTimeframeAnalysis } from '../../../hooks/useTimeframeAnalysis';
import { formatNumber } from '../../../utils/formatNumber';
import { analyzeTimeframe } from '../../../utils/analysis/timeframeAnalysis';

interface Props {
  address: string;
}

export const TimeframeReport: React.FC<Props> = ({ address }) => {
  const { analysis, isLoading } = useTimeframeAnalysis(address);

  if (isLoading) {
    return (
      <div className="bg-black/20 backdrop-blur-xl rounded-xl border border-white/10 p-6">
        <div className="h-[140px] flex items-center justify-center">
          <div className="text-primary animate-pulse">Loading timeframe report...</div>
        </div>
      </div>
    );
  }

  const m30Analysis = analyzeTimeframe(analysis.m30, '30m');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/20 backdrop-blur-xl rounded-xl border border-white/10 p-6"
    >
      <h3 className="text-xl font-semibold mb-4">30 Minute Analysis</h3>
      
      <div className="space-y-6">
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-medium">Market Analysis</h4>
            <span className={`px-2 py-1 rounded-full text-sm ${
              m30Analysis.sentiment === 'bullish' ? 'bg-green-500/20 text-green-400' :
              m30Analysis.sentiment === 'bearish' ? 'bg-red-500/20 text-red-400' :
              'bg-blue-500/20 text-blue-400'
            }`}>
              {m30Analysis.sentiment.toUpperCase()}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-sm text-gray-400 mb-1">Price Change</div>
              <div className={`text-lg font-semibold ${
                analysis.m30.change >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {analysis.m30.change >= 0 ? '+' : ''}{analysis.m30.change.toFixed(6)}%
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-400 mb-1">Volume</div>
              <div className="text-lg font-semibold">${formatNumber(analysis.m30.volume)}</div>
            </div>
          </div>

          <div className="space-y-2">
            {m30Analysis.signals.map((signal, index) => (
              <div key={index} className="text-sm text-gray-300 flex items-center gap-2">
                <span className={signal.type === 'bullish' ? 'text-green-400' : 
                               signal.type === 'bearish' ? 'text-red-400' : 
                               'text-blue-400'}>
                  {signal.type === 'bullish' ? '↗' : 
                   signal.type === 'bearish' ? '↘' : '→'}
                </span>
                {signal.message}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};