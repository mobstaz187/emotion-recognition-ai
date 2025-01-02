import React, { useState } from 'react';
import { TokenSearch } from './TokenSearch';
import { TokenInfo } from './TokenInfo';
import { TokenSocials } from './TokenSocials';
import { useTokenData } from '../../hooks/useTokenData';

export const TokenMonitor: React.FC = () => {
  const [address, setAddress] = useState<string>('');
  const { tokenData, isLoading, error } = useTokenData(address);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-black/30 dark:bg-gray-900/30 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-200">Token Sentiment Analysis</h2>
          <div className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full">
            <span className="text-sm text-blue-400">Solana Tokens Only</span>
          </div>
        </div>
        
        <TokenSearch onSearch={setAddress} />
        
        {error && (
          <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
            {error}
          </div>
        )}
        
        {isLoading && (
          <div className="mt-4 text-blue-400 animate-pulse">Loading token data...</div>
        )}
        
        {tokenData && (
          <div className="mt-6 space-y-6">
            <TokenSocials data={tokenData} />
            <TokenInfo data={tokenData} />
          </div>
        )}
      </div>
    </div>
  );
};