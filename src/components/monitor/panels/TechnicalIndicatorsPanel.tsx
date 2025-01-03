import React from 'react';
import { TechnicalIndicators } from '../../../types/token';
import { motion } from 'framer-motion';

interface Props {
  indicators: TechnicalIndicators;
}

export const TechnicalIndicatorsPanel: React.FC<Props> = ({ indicators }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/20 backdrop-blur-xl rounded-xl border border-white/10 p-6"
    >
      <h3 className="text-xl font-semibold mb-4">Technical Analysis</h3>
      
      <div className="space-y-4">
        <div className="bg-white/5 rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-2">RSI (14)</div>
          <div className="text-xl font-semibold">
            {indicators.rsi.toFixed(2)}
          </div>
        </div>

        <div className="bg-white/5 rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-2">MACD</div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-xs text-gray-500">Value</div>
              <div className="text-sm font-medium">{indicators.macd.value.toFixed(2)}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Signal</div>
              <div className="text-sm font-medium">{indicators.macd.signal.toFixed(2)}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Histogram</div>
              <div className="text-sm font-medium">{indicators.macd.histogram.toFixed(2)}</div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-2">Bollinger Bands</div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-xs text-gray-500">Upper</div>
              <div className="text-sm font-medium">{indicators.bollingerBands.upper.toFixed(4)}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Middle</div>
              <div className="text-sm font-medium">{indicators.bollingerBands.middle.toFixed(4)}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Lower</div>
              <div className="text-sm font-medium">{indicators.bollingerBands.lower.toFixed(4)}</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};