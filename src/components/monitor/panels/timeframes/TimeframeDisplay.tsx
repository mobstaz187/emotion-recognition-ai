import React from 'react';
import { TimeframeData } from '../../../../types/timeframe';
import { formatNumber } from '../../../../utils/formatNumber';
import { SignalList } from './SignalList';

interface Props {
  data: TimeframeData;
  timeframe: string;
}

export const TimeframeDisplay: React.FC<Props> = ({ data, timeframe }) => {
  return (
    <div className="bg-white/5 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="text-sm text-gray-400">Price Change ({timeframe})</div>
          <div className={`text-lg font-semibold ${
            data.change >= 0 ? 'text-green-400' : 'text-red-400'
          }`}>
            {data.change >= 0 ? '+' : ''}{data.change.toFixed(3)}%
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400">Volume</div>
          <div className="text-lg font-semibold">${formatNumber(data.volume)}</div>
        </div>
      </div>

      <SignalList signals={data.signals} />
    </div>
  );
};