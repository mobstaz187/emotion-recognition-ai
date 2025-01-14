import React from 'react';
import { TimeframeData } from '../../../../types/timeframe';

interface Props {
  data: TimeframeData;
  minutes: number;
}

export const TimeframeTrades: React.FC<Props> = ({ data, minutes }) => {
  // Only show trades/min if it's a valid number
  const tradesPerMinute = data.trades / minutes;
  const showTradesPerMin = !isNaN(tradesPerMinute) && isFinite(tradesPerMinute);

  return (
    <div className="bg-background rounded-lg p-4 border border-border">
      <h3 className="text-sm font-medium text-muted-foreground mb-3">Trading Activity</h3>
      <div className="flex justify-between text-center">
        <div className="flex-1 border-r border-border">
          <div className="text-sm text-muted-foreground">Total Trades</div>
          <div className="text-lg font-semibold text-foreground">
            {data.trades.toLocaleString()}
          </div>
        </div>
        {showTradesPerMin && (
          <div className="flex-1">
            <div className="text-sm text-muted-foreground">Trades/Min</div>
            <div className="text-lg font-semibold text-foreground">
              {tradesPerMinute.toFixed(2)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};