import React, { useState } from 'react';
import { TokenSearch } from './TokenSearch';
import { TokenSocials } from './TokenSocials';
import { TokenInfo } from './TokenInfo';
import { TokenAnalysisPanel } from './TokenAnalysisPanel';
import { useTokenData } from '../../hooks/useTokenData';

export const TokenMonitor: React.FC = () => {
  const [address, setAddress] = useState('');
  const { tokenData, isLoading, error } = useTokenData(address);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="glass-panel p-6 space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Token Sentiment Analysis</h2>
          <div className="px-3 py-1 bg-primary/20 border border-primary/30 rounded-full">
            <span className="text-sm text-primary">Solana Tokens Only</span>
          </div>
        </div>
        
        <TokenSearch onSearch={setAddress} />
        
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
            {error}
          </div>
        )}
        
        {isLoading && (
          <div className="text-primary animate-pulse">Loading token data...</div>
        )}
        
        {tokenData && address && (
          <div className="space-y-8">
            <TokenSocials data={tokenData} />
            <TokenInfo data={tokenData} address={address} />
            <TokenAnalysisPanel data={tokenData} address={address} />
          </div>
        )}
      </div>
    </div>
  );
};