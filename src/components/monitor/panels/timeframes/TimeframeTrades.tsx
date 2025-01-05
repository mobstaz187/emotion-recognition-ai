import React from 'react';
import { TimeframeData } from '../../../../types/timeframe';

interface Props {
  data: TimeframeData;
  minutes: number;
}

export const TimeframeTrades: React.FC<Props> = ({ data, minutes }) => (
  <div className="bg-background rounded-lg p-4 border border-border">
    <div className="flex justify-between text-center">
      <div className="flex-1 border-r border-border">
        <div className="text-sm text-muted-foreground">Total Trades</div>
        <div className="text-lg font-semibold text-foreground">{data.trades.toLocaleString()}</div>
      </div>
      <div className="flex-1">
        <div className="text-sm text-muted-foreground">Trades/Min</div>
        <div className="text-lg font-semibold text-foreground">
          {(data.trades / minutes).toFixed(3)}
        </div>
      </div>
    </div>
  </div>
);