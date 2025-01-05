import React from 'react';
import { Level } from '../../types/chart';

interface Props {
  levels: Level[];
  scenario: 'bullish' | 'bearish' | 'neutral';
}

export const ChartResult: React.FC<Props> = ({ levels, scenario }) => {
  const supportLevels = levels.filter(l => l.type === 'support');
  const resistanceLevels = levels.filter(l => l.type === 'resistance');

  return (
    <div className="bg-white/5 rounded-lg p-4">
      <h3 className={`text-lg font-semibold mb-2 ${
        scenario === 'bullish' ? 'text-green-400' :
        scenario === 'bearish' ? 'text-red-400' :
        'text-blue-400'
      }`}>
        Analysis Results
      </h3>
      <div className="space-y-2">
        <p className="text-gray-400">
          Found {supportLevels.length} support and {resistanceLevels.length} resistance levels
        </p>
        <p className="text-gray-400">
          {scenario === 'bullish' && 'Price likely to break above resistance levels'}
          {scenario === 'bearish' && 'Price likely to break below support levels'}
          {scenario === 'neutral' && 'Price likely to stay within the range'}
        </p>
      </div>
    </div>
  );
};