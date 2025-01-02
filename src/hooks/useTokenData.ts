import { useState, useEffect } from 'react';
import { TokenData } from '../types/token';

export function useTokenData(address: string) {
  const [tokenData, setTokenData] = useState<TokenData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!address) return;

    async function fetchTokenData() {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
          `https://api.dexscreener.com/latest/dex/tokens/${address}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch token data');
        }
        
        const data = await response.json();
        
        if (!data.pairs || data.pairs.length === 0) {
          throw new Error('No data found for this token');
        }
        
        // Use the first pair's data
        const pair = data.pairs[0];
        
        setTokenData({
          name: pair.baseToken.name,
          symbol: pair.baseToken.symbol,
          marketCap: Number(pair.fdv) || 0,
          price: Number(pair.priceUsd) || 0,
          volume24h: Number(pair.volume.h24) || 0,
          priceChange24h: Number(pair.priceChange.h24) || 0,
          twitter: pair.baseToken.twitter,
          telegram: pair.baseToken.telegram,
          website: pair.baseToken.website
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch token data');
      } finally {
        setIsLoading(false);
      }
    }

    fetchTokenData();
  }, [address]);

  return { tokenData, isLoading, error };
}