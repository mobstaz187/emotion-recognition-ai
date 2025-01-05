import React from 'react';
import { ChartPattern } from '../../types/chart';

interface Props {
  pattern: ChartPattern;
}

export const PatternInfo: React.FC<Props> = ({ pattern }) => {
  return (
    <div className="bg-white/5 rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-2">{pattern.name}</h3>
      <p className="text-gray-400 mb-4">{pattern.description}</p>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-400">Reliability:</span>
        <div className="flex-1 h-2 bg-gray-700 rounded-full">
          <div 
            className="h-full bg-primary rounded-full"
            style={{ width: `${pattern.reliability * 100}%` }}
          />
        </div>
        <span className="text-sm text-gray-400">
          {Math.round(pattern.reliability * 100)}%
        </span>
      </div>
    </div>
  );
};