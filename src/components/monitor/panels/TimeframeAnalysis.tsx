import React from 'react';
import { motion } from 'framer-motion';
import { useTimeframeAnalysis } from '../../../hooks/useTimeframeAnalysis';
import { formatNumber } from '../../../utils/formatNumber';
import { SignalIcon } from '../icons/SignalIcon';

interface Props {
  address: string;
}

export const TimeframeAnalysis: React.FC<Props> = ({ address }) => {
  const { analysis, isLoading } = useTimeframeAnalysis(address);

  if (isLoading) {
    return (
      <div className="bg-black/20 backdrop-blur-xl rounded-xl border border-white/10 p-6">
        <div className="h-[140px] flex items-center justify-center">
          <div className="text-primary animate-pulse">Loading timeframe analysis...</div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/20 backdrop-blur-xl rounded-xl border border-white/10 p-6"
    >
      <h3 className="text-xl font-semibold mb-4">30 Minute Analysis</h3>
      
      <div className="space-y-4">
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="text-sm text-gray-400">Price Change</div>
              <div className={`text-lg font-semibold ${
                analysis.m30.change >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {analysis.m30.change >= 0 ? '+' : ''}{analysis.m30.change.toFixed(3)}%
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">Volume</div>
              <div className="text-lg font-semibold">${formatNumber(analysis.m30.volume)}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-400">Trades</div>
              <div className="text-base font-medium">{analysis.m30.trades.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Trades/Min</div>
              <div className="text-base font-medium">
                {(analysis.m30.trades / 30).toFixed(3)}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-400 mb-3">Market Activity</h4>
          <div className="space-y-2">
            {analysis.m30.signals.map((signal, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <SignalIcon 
                  type={signal.type} 
                  className={`w-4 h-4 ${
                    signal.type === 'bullish' ? 'text-green-400' :
                    signal.type === 'bearish' ? 'text-red-400' :
                    'text-blue-400'
                  }`}
                />
                <span className="text-gray-300">{signal.message}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};