import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  name: string;
  symbol: string;
  profileColor: string;
}

export const TokenHeader: React.FC<Props> = ({ name, symbol, profileColor }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col"
    >
      <h1 className="text-4xl font-bold font-display mb-2" style={{ 
        background: `-webkit-linear-gradient(${profileColor}, ${profileColor}80)`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        {name}
      </h1>
      <div className="flex items-center gap-3">
        <span className="text-lg px-3 py-1 rounded-full font-medium"
          style={{ 
            backgroundColor: `${profileColor}10`,
            color: profileColor
          }}>
          ${symbol}
        </span>
        <span className="text-sm text-muted-foreground">
          Contract Token
        </span>
      </div>
    </motion.div>
  );
};