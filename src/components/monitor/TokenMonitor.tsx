import React from 'react';
import { TokenSearch } from './TokenSearch';
import { TokenSocials } from './TokenSocials';
import { TokenInfo } from './TokenInfo';
import { TokenAnalysisPanel } from './TokenAnalysisPanel';
import { useProfile } from '../../contexts/ProfileContext';
import { useToken } from '../../contexts/TokenContext';
import { motion } from 'framer-motion';
import { useTokenData } from '../../hooks/useTokenData';

export const TokenMonitor: React.FC = () => {
  const { currentProfile } = useProfile();
  const { 
    address, 
    setAddress,
    tokenData,
    setTokenData,
    isLoading,
    setIsLoading,
    error,
    setError
  } = useToken();
  const profileColor = currentProfile?.color || '#3B82F6';

  useTokenData({
    address,
    onSuccess: setTokenData,
    onError: setError,
    onLoadingChange: setIsLoading
  });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="glass-panel p-4 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">Token Sentiment Analysis</h2>
          <div 
            className="px-4 py-1.5 rounded-full text-sm whitespace-nowrap"
            style={{
              backgroundColor: `${profileColor}20`,
              borderColor: `${profileColor}30`,
              borderWidth: '1px',
              color: profileColor
            }}
          >
            Solana Tokens Only (For tokens that made it to Raydium)
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
          <div className="animate-pulse" style={{ color: profileColor }}>
            Loading token data...
          </div>
        )}
        
        {tokenData && address && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="bg-white/80 dark:bg-card/80 backdrop-blur-xl rounded-xl border border-border p-4 md:p-6">
              <TokenSocials data={tokenData} profileColor={profileColor} />
              <TokenInfo data={tokenData} address={address} />
            </div>

            <TokenAnalysisPanel data={tokenData} address={address} />
          </motion.div>
        )}
      </div>
    </div>
  );
};