import React, { useState } from 'react';
import { useTimeframeAnalysis } from '../../../hooks/useTimeframeAnalysis';
import { TimeframeSelector } from './timeframes/TimeframeSelector';
import { TimeframeMetrics } from './timeframes/TimeframeMetrics';
import { TimeframeActivity } from './timeframes/TimeframeActivity';
import { TimeframeTrades } from './timeframes/TimeframeTrades';

interface Props {
  address: string;
}

export type TimeframeOption = '1m' | '15m' | '30m' | '1h' | '4h' | '24h';

export const TimeframeAnalysis: React.FC<Props> = ({ address }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<TimeframeOption>('15m');
  const { analysis, isLoading } = useTimeframeAnalysis(address);

  const handleTimeframeChange = (timeframe: string) => {
    setSelectedTimeframe(timeframe as TimeframeOption);
  };

  if (isLoading) {
    return (
      <div className="bg-white/80 dark:bg-card/80 backdrop-blur-xl rounded-xl border border-border p-6">
        <div className="h-[140px] flex items-center justify-center">
          <div className="text-primary animate-pulse">Loading timeframe analysis...</div>
        </div>
      </div>
    );
  }

  const timeframeData = {
    '1m': analysis?.m1 || { change: 0, volume: 0, trades: 0, signals: [] },
    '15m': analysis?.m15 || { change: 0, volume: 0, trades: 0, signals: [] },
    '30m': analysis?.m30 || { change: 0, volume: 0, trades: 0, signals: [] },
    '1h': analysis?.h1 || { change: 0, volume: 0, trades: 0, signals: [] },
    '4h': analysis?.h4 || { change: 0, volume: 0, trades: 0, signals: [] },
    '24h': analysis?.h24 || { change: 0, volume: 0, trades: 0, signals: [] }
  };

  const currentData = timeframeData[selectedTimeframe];
  const minutes = parseInt(selectedTimeframe);

  return (
    <div className="bg-white/80 dark:bg-card/80 backdrop-blur-xl rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-foreground">Market Analysis</h3>
        <TimeframeSelector 
          selected={selectedTimeframe}
          onChange={handleTimeframeChange}
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