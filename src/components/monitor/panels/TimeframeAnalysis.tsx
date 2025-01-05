```typescript
import React, { useState } from 'react';
import { useTimeframeAnalysis } from '../../../hooks/useTimeframeAnalysis';
import { TimeframeSelector } from './timeframes/TimeframeSelector';
import { TimeframeDisplay } from './timeframes/TimeframeDisplay';
import { SignalList } from './timeframes/SignalList';
import { LoadingPanel } from '../../common/LoadingPanel';

interface Props {
  address: string;
}

export const TimeframeAnalysis: React.FC<Props> = ({ address }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'15m' | '30m' | '1h'>('15m');
  const { analysis, isLoading } = useTimeframeAnalysis(address);

  if (isLoading) {
    return <LoadingPanel message="Loading timeframe analysis..." />;
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
        <TimeframeDisplay 
          change={timeframeData.change}
          volume={timeframeData.volume}
        />
        <SignalList signals={timeframeData.signals} />
      </div>
    </div>
  );
};
```