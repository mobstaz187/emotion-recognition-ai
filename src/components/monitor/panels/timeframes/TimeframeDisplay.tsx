```typescript
import React from 'react';
import { formatNumber } from '../../../../utils/formatNumber';

interface Props {
  change: number;
  volume: number;
}

export const TimeframeDisplay: React.FC<Props> = ({ change, volume }) => (
  <div className="bg-white/5 rounded-lg p-4">
    <div className="flex justify-between text-center">
      <div className="flex-1 border-r border-white/10">
        <div className="text-sm text-gray-400 mb-1">Price Change</div>
        <div className={`text-lg font-semibold ${
          change >= 0 ? 'text-green-400' : 'text-red-400'
        }`}>
          {change >= 0 ? '+' : ''}{change.toFixed(3)}%
        </div>
      </div>
      <div className="flex-1">
        <div className="text-sm text-gray-400 mb-1">Volume</div>
        <div className="text-lg font-semibold">${formatNumber(volume)}</div>
      </div>
    </div>
  </div>
);
```