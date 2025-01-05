import React from 'react';
import { ChartAnalysisResult } from '../../types/chart';

interface Props {
  result: ChartAnalysisResult;
}

export const ChartResult: React.FC<Props> = ({ result }) => {
  const { levels, patterns, prediction, signals } = result;

  return (
    <div className="space-y-6">
      {signals.map((signal, index) => (
        <div key={index} className={`
          p-4 rounded-lg border
          ${signal.type === 'bullish' ? 'bg-green-500/10 border-green-500/20' :
            signal.type === 'bearish' ? 'bg-red-500/10 border-red-500/20' :
            'bg-blue-500/10 border-blue-500/20'}
        `}>
          <p className="text-gray-300">{signal.message}</p>
        </div>
      ))}
    </div>
  );
};