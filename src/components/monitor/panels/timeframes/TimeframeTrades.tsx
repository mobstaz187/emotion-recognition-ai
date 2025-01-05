import React from 'react';
import { TimeframeData } from '../../../../types/timeframe';

interface Props {
  data: TimeframeData;
  minutes: number;
}

export const TimeframeTrades: React.FC<Props> = ({ data, minutes }) => (
  <div className="bg-white/5 rounded-lg p-4">
    <div className="flex justify-between text-center">
      <div className="flex-1 border-r border-white/10">
        <div className="text-sm text-gray-400">Total Trades</div>
        <div className="text-lg font-semibold">{data.trades.toLocaleString()}</div>
      </div>
      <div className="flex-1">
        <div className="text-sm text-gray-400">Trades/Min</div>
        <div className="text-lg font-semibold">
          {(data.trades / minutes).toFixed(3)}
        </div>
      </div>
    </div>
  </div>
);