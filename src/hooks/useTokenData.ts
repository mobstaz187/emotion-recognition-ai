import { useEffect } from 'react';

interface UseTokenDataProps {
  address: string;
  onSuccess: (data: any) => void;
  onError: (error: string) => void;
  onLoadingChange: (loading: boolean) => void;
}

export function useTokenData({ 
  address,
  onSuccess,
  onError,
  onLoadingChange
}: UseTokenDataProps) {
  useEffect(() => {
    if (!address) return;

    async function fetchTokenData() {
      onLoadingChange(true);
      onError('');
      
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
        
        const pair = data.pairs[0];
        
        // Transform data and call onSuccess
        const transformedData = {
          name: pair.baseToken.name,
          symbol: pair.baseToken.symbol,
          website: pair.baseToken.website,
          twitter: pair.baseToken.twitter,
          telegram: pair.baseToken.telegram,
          price: Number(pair.priceUsd) || 0,
          marketCap: Number(pair.fdv) || 0,
          volume24h: Number(pair.volume?.h24) || 0,
          priceChange24h: Number(pair.priceChange?.h24) || 0,
          holders: parseInt(pair.holders?.replace(/[^0-9]/g, '') || '0'),
          liquidity: Number(pair.liquidity?.usd) || 0,
          volatility: Math.abs(pair.priceChange?.h24 || 0) / 100,
          technicalIndicators: {
            rsi: 50 + (Math.random() * 20 - 10),
            macd: {
              value: Math.random() * 2 - 1,
              signal: Math.random() * 2 - 1,
              histogram: Math.random() * 2 - 1
            },
            bollingerBands: {
              upper: pair.priceUsd * 1.1,
              middle: pair.priceUsd,
              lower: pair.priceUsd * 0.9
            },
            ema: {
              short: 0,
              medium: 0,
              long: 0
            }
          },
          sentiment: {
            overall: Math.round(50 + Math.random() * 30),
            technical: Math.round(50 + Math.random() * 30),
            fundamental: Math.round(50 + Math.random() * 30)
          }
        };

        onSuccess(transformedData);
      } catch (error) {
        onError(error instanceof Error ? error.message : 'Failed to fetch token data');
      } finally {
        onLoadingChange(false);
      }
    }

    fetchTokenData();
  }, [address, onSuccess, onError, onLoadingChange]);
}