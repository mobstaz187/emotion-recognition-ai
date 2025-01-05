import React from 'react';
import { TimeframeSignal } from '../../../../types/timeframe';
import { SignalIcon } from '../../icons/SignalIcon';

interface Props {
  signals: TimeframeSignal[];
}

export const SignalList: React.FC<Props> = ({ signals }) => {
  return (
    <div className="space-y-2">
      {signals.map((signal, index) => (
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
  );
};