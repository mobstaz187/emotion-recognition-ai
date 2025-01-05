import React, { useState } from 'react';
import { TokenSearch } from './TokenSearch';
import { TokenSocials } from './TokenSocials';
import { TokenInfo } from './TokenInfo';
import { TokenAnalysisPanel } from './TokenAnalysisPanel';
import { useTokenData } from '../../hooks/useTokenData';
import { useProfile } from '../../contexts/ProfileContext';
import { motion } from 'framer-motion';

export const TokenMonitor: React.FC = () => {
  const [address, setAddress] = useState('');
  const { tokenData, isLoading, error } = useTokenData(address);
  const { currentProfile } = useProfile();
  const profileColor = currentProfile?.color || '#3B82F6';

  return (
    <div className="max-w-6xl mx-auto">
      <div className="glass-panel p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Token Sentiment Analysis</h2>
          <div 
            className="px-4 py-1.5 rounded-full"
            style={{
              backgroundColor: `${profileColor}20`,
              borderColor: `${profileColor}30`,
              borderWidth: '1px',
              color: profileColor
            }}
          >
            <span className="text-sm">Solana Tokens Only</span>
          </div>
        </div>
        
        <TokenSearch onSearch={setAddress} />
        
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500"
          >
            {error}
          </motion.div>
        )}
        
        {isLoading && (
          <div className="text-primary animate-pulse">Loading token data...</div>
        )}
        
        {tokenData && address && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="bg-card/80 rounded-xl border border-border p-6">
              <TokenSocials data={tokenData} />
              <TokenInfo data={tokenData} address={address} />
            </div>
            <TokenAnalysisPanel data={tokenData} address={address} />
          </motion.div>
        )}
      </div>
    </div>
  );
};