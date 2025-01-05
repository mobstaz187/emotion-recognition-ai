```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { useTimeframeAnalysis } from '../../../hooks/useTimeframeAnalysis';
import { analyzeTimeframe } from '../../../utils/analysis/timeframeAnalysis';

interface Props {
  address: string;
}

export const TimeframeReport: React.FC<Props> = ({ address }) => {
  const { analysis, isLoading } = useTimeframeAnalysis(address);

  if (isLoading) {
    return (
      <div className="bg-black/20 backdrop-blur-xl rounded-xl border border-white/10 p-6">
        <div className="h-[140px] flex items-center justify-center">
          <div className="text-primary animate-pulse">Loading timeframe report...</div>
        </div>
      </div>
    );
  }

  const analysisResult = analyzeTimeframe(analysis.m15);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/20 backdrop-blur-xl rounded-xl border border-white/10 p-6"
    >
      <div className="space-y-4">
        {analysisResult.signals.map((signal, index) => (
          <div key={index} className={`p-4 rounded-lg ${
            signal.type === 'bullish' ? 'bg-green-500/10' :
            signal.type === 'bearish' ? 'bg-red-500/10' :
            'bg-blue-500/10'
          }`}>
            <p className="text-gray-300">{signal.message}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
```