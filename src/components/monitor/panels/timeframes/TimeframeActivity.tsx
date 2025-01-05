import React from 'react';
import { SignalIcon } from '../../icons/SignalIcon';
import type { TimeframeSignal } from '../../../../types/timeframe';

interface Props {
  signals: TimeframeSignal[];
}

export const TimeframeActivity: React.FC<Props> = ({ signals }) => (
  <div className="bg-background rounded-lg p-4 border border-border">
    <h4 className="text-sm font-medium text-muted-foreground mb-3">Market Activity</h4>
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
          <span className="text-foreground">{signal.message}</span>
        </div>
      ))}
    </div>
  </div>
);