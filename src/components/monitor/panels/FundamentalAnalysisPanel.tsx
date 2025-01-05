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
      className="bg-card/80 backdrop-blur-xl rounded-xl border border-border p-6"
    >
      <h3 className="text-xl font-semibold text-foreground mb-4">Fundamental Analysis</h3>
      
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-background rounded-lg p-4 border border-border">
          <div className="text-sm text-muted-foreground mb-1">Market Cap</div>
          <div className="text-lg font-semibold text-foreground">${formatNumber(metrics.marketCap)}</div>
        </div>

        <div className="bg-background rounded-lg p-4 border border-border">
          <div className="text-sm text-muted-foreground mb-1">Volatility (24h)</div>
          <div className="text-lg font-semibold text-foreground">{(metrics.volatility * 100).toFixed(2)}%</div>
        </div>

        <div className="bg-background rounded-lg p-4 border border-border">
          <div className="text-sm text-muted-foreground mb-1">Liquidity</div>
          <div className="text-lg font-semibold text-foreground">${formatNumber(metrics.liquidity)}</div>
        </div>
      </div>
    </motion.div>
  );
};