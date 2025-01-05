import React, { useState } from 'react';
import { useTimeframeAnalysis } from '../../../hooks/useTimeframeAnalysis';
import { TimeframeSelector } from './timeframes/TimeframeSelector';
import { formatNumber } from '../../../utils/formatNumber';
import { SignalIcon } from '../icons/SignalIcon';

interface Props {
  address: string;
}

export const TimeframeAnalysis: React.FC<Props> = ({ address }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'15m' | '30m' | '1h'>('15m');
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

  const timeframeData = analysis[selectedTimeframe === '1h' ? 'h1' : selectedTimeframe === '30m' ? 'm30' : 'm15'];

  return (
    <div className="bg-black/20 backdrop-blur-xl rounded-xl border border-white/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Market Analysis</h3>
        <TimeframeSelector 
          selected={selectedTimeframe}
          onChange={setSelectedTimeframe}
        />
      </div>
      
      <div className="space-y-4">
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex justify-between text-center">
            <div className="flex-1 border-r border-white/10">
              <div className="text-sm text-gray-400 mb-1">Price Change</div>
              <div className={`text-lg font-semibold ${
                timeframeData.change >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {timeframeData.change >= 0 ? '+' : ''}{timeframeData.change.toFixed(3)}%
              </div>
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-400 mb-1">Volume</div>
              <div className="text-lg font-semibold">${formatNumber(timeframeData.volume)}</div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-400 mb-3">Market Activity</h4>
          <div className="space-y-2">
            {timeframeData.signals.map((signal, index) => (
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
    </div>
  );
};