import React from 'react';
import type { ChartPattern } from '../../types/chart';

interface Props {
  pattern: ChartPattern;
}

export const PatternInfo: React.FC<Props> = ({ pattern }) => {
  return (
    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
      <h4 className="text-lg font-semibold mb-2">
        Pattern Detected: {pattern.name}
      </h4>
      <p className="text-gray-400 text-sm mb-3">{pattern.description}</p>
      <div className="flex items-center gap-2">
        <span className={`text-sm ${
          pattern.reliability > 0.7 ? 'text-green-400' :
          pattern.reliability > 0.4 ? 'text-yellow-400' :
          'text-red-400'
        }`}>
          Reliability: {Math.round(pattern.reliability * 100)}%
        </span>
      </div>
    </div>
  );
};