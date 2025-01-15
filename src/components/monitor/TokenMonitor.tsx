import React from 'react';
import { TokenSearch } from './TokenSearch';
import { TokenSocials } from './TokenSocials';
import { TokenInfo } from './TokenInfo';
import { TokenAnalysisPanel } from './TokenAnalysisPanel';
import { useProfile } from '../../contexts/ProfileContext';
import { useToken } from '../../contexts/TokenContext';
import { motion } from 'framer-motion';
import { useTokenData } from '../../hooks/useTokenData';

interface Props {
  setShowTokenInstructions: (show: boolean) => void;
}

export const TokenMonitor: React.FC<Props> = ({ setShowTokenInstructions }) => {
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
          <div>
            <div className="flex items-center mb-1">
              <h2 className="text-xl md:text-2xl font-bold text-foreground">Token Sentiment Analysis</h2>
              <button
                onClick={() => setShowTokenInstructions(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium rounded-lg transition-colors ml-2"
              >
                See Tutorial
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
            <p className="text-muted-foreground">Solana Tokens Only (For tokens that made it to Raydium)</p>
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