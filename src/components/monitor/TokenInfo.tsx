import React from 'react';
import { TokenData } from '../../types/token';
import { formatNumber } from '../../utils/formatNumber';
import { TradingButtons } from './TradingButtons';
import { motion } from 'framer-motion';

interface Props {
  data: TokenData;
  address: string;
}

export const TokenInfo: React.FC<Props> = ({ data, address }) => {
  const formattedPrice = data.price < 0.0001 
    ? data.price.toFixed(12)
    : formatNumber(data.price);

  return (
    <div className="mt-4 space-y-4">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div className="bg-background rounded-lg p-4 border border-border">
          <h3 className="text-sm text-muted-foreground mb-1">Market Cap</h3>
          <p className="text-xl font-semibold text-foreground">
            ${formatNumber(data.marketCap)}
          </p>
        </div>
        
        <div className="bg-background rounded-lg p-4 border border-border">
          <h3 className="text-sm text-muted-foreground mb-1">Price</h3>
          <p className="text-xl font-semibold text-foreground">
            ${formattedPrice}
          </p>
        </div>
        
        <div className="bg-background rounded-lg p-4 border border-border">
          <h3 className="text-sm text-muted-foreground mb-1">24h Volume</h3>
          <p className="text-xl font-semibold text-foreground">
            ${formatNumber(data.volume24h)}
          </p>
        </div>
        
        <div className="bg-background rounded-lg p-4 border border-border">
          <h3 className="text-sm text-muted-foreground mb-1">Price Change 24h</h3>
          <p className={`text-xl font-semibold ${
            data.priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'
          }`}>
            {data.priceChange24h > 0 ? '+' : ''}{data.priceChange24h.toFixed(2)}%
          </p>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-background rounded-lg p-4 border border-border"
      >
        <h3 className="text-sm text-muted-foreground mb-3">Trading Platforms</h3>
        <TradingButtons address={address} />
      </motion.div>
    </div>
  );
};