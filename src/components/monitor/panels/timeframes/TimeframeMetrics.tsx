import React from 'react';
import { TimeframeData } from '../../../../types/timeframe';

interface Props {
  data: TimeframeData;
}

export const TimeframeMetrics: React.FC<Props> = ({ data }) => (
  <div className="bg-background rounded-lg p-4 border border-border">
    <h3 className="text-sm font-medium text-muted-foreground mb-3">Price Analysis</h3>
    <div className="flex justify-between text-center">
      <div className="flex-1 border-r border-border">
        <div className="text-sm text-muted-foreground mb-1">Price Change</div>
        <div className={`text-lg font-semibold ${
          data.change >= 0 ? 'text-green-400' : 'text-red-400'
        }`}>
          {data.change >= 0 ? '+' : ''}{data.change.toFixed(3)}%
        </div>
      </div>
      <div className="flex-1">
        <div className="text-sm text-muted-foreground mb-1">Volume</div>
        <div className="text-lg font-semibold text-foreground">
          ${(data.volume / 1000).toFixed(1)}K
        </div>
      </div>
    </div>
  </div>
);