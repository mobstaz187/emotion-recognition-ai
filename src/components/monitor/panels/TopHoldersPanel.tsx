import React from 'react';
import { motion } from 'framer-motion';
import { formatNumber } from '../../../utils/formatNumber';

interface Holder {
  address: string;
  balance: number;
  percentage: number;
}

interface Props {
  holders: Holder[];
  totalSupply: number;
}

export const TopHoldersPanel: React.FC<Props> = ({ holders, totalSupply }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/20 backdrop-blur-xl rounded-xl border border-white/10 p-6"
    >
      <h3 className="text-xl font-semibold mb-4">Top Holders</h3>
      
      <div className="space-y-4">
        {holders.map((holder, index) => (
          <div 
            key={holder.address}
            className="bg-white/5 rounded-lg p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">#{index + 1}</span>
              <div>
                <div className="font-mono text-sm text-gray-300">
                  {holder.address.slice(0, 6)}...{holder.address.slice(-4)}
                </div>
                <div className="text-xs text-gray-500">
                  {formatNumber(holder.balance)} tokens
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-primary">
                {holder.percentage.toFixed(2)}%
              </div>
              <div className="text-xs text-gray-500">
                ${formatNumber(holder.balance * totalSupply)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};