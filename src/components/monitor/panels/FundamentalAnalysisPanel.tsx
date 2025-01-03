import React from 'react';
import { TokenMetrics } from '../../../types/token';
import { motion } from 'framer-motion';
import { formatNumber } from '../../../utils/formatNumber';

interface Props {
  metrics: TokenMetrics;
}

export const FundamentalAnalysisPanel: React.FC<Props> = ({ metrics }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/20 backdrop-blur-xl rounded-xl border border-white/10 p-6"
    >
      <h3 className="text-xl font-semibold mb-4">Fundamental Analysis</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/5 rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-1">Market Cap</div>
          <div className="text-lg font-semibold">${formatNumber(metrics.marketCap)}</div>
        </div>

        <div className="bg-white/5 rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-1">Volatility</div>
          <div className="text-lg font-semibold">{(metrics.volatility * 100).toFixed(2)}%</div>
        </div>
      </div>
    </motion.div>
  );
};