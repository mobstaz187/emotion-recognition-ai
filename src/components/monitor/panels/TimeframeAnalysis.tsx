import React, { useState } from 'react';
import { useTimeframeAnalysis } from '../../../hooks/useTimeframeAnalysis';
import { TimeframeSelector } from './timeframes/TimeframeSelector';
import { TimeframeMetrics } from './timeframes/TimeframeMetrics';
import { TimeframeActivity } from './timeframes/TimeframeActivity';
import { TimeframeTrades } from './timeframes/TimeframeTrades';

interface Props {
  address: string;
}

type TimeframeOption = '15m' | '30m' | '1h';

export const TimeframeAnalysis: React.FC<Props> = ({ address }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<TimeframeOption>('15m');
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

  const timeframeData = {
    '15m': analysis.m15,
    '30m': analysis.m30,
    '1h': analysis.h1
  };

  const currentData = timeframeData[selectedTimeframe];
  const minutes = parseInt(selectedTimeframe);

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
        <TimeframeMetrics data={currentData} />
        <TimeframeTrades data={currentData} minutes={minutes} />
        <TimeframeActivity signals={currentData.signals} />
      </div>
    </div>
  );
};