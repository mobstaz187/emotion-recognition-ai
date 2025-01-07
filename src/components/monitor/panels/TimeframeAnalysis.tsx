import React from 'react';
import { useTimeframeAnalysis } from '../../../hooks/useTimeframeAnalysis';
import { TimeframeMetrics } from './timeframes/TimeframeMetrics';
import { TimeframeActivity } from './timeframes/TimeframeActivity';
import { TimeframeTrades } from './timeframes/TimeframeTrades';

interface Props {
  address: string;
}

export const TimeframeAnalysis: React.FC<Props> = ({ address }) => {
  const { analysis, isLoading } = useTimeframeAnalysis(address);

  if (isLoading) {
    return (
      <div className="bg-white/80 dark:bg-card/80 backdrop-blur-xl rounded-xl border border-border p-6">
        <div className="h-[140px] flex items-center justify-center">
          <div className="text-primary animate-pulse">Loading timeframe analysis...</div>
        </div>
      </div>
    );
  }

  const timeframes = [
    { key: 'm1', label: '1 Minute', data: analysis.m1 },
    { key: 'm15', label: '15 Minutes', data: analysis.m15 },
    { key: 'm30', label: '30 Minutes', data: analysis.m30 },
    { key: 'h1', label: '1 Hour', data: analysis.h1 },
    { key: 'h4', label: '4 Hours', data: analysis.h4 },
    { key: 'h24', label: '24 Hours', data: analysis.h24 }
  ];

  return (
    <div className="bg-white/80 dark:bg-card/80 backdrop-blur-xl rounded-xl border border-border p-6">
      <h3 className="text-xl font-semibold text-foreground mb-6">Market Analysis</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {timeframes.map(({ key, label, data }) => (
          <div key={key} className="bg-background rounded-lg border border-border p-4">
            <h4 className="text-lg font-medium text-foreground mb-4">{label}</h4>
            <div className="space-y-4">
              <TimeframeMetrics data={data} />
              <TimeframeTrades data={data} minutes={parseInt(key.replace(/[mh]/, ''))} />
              <TimeframeActivity signals={data.signals} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};