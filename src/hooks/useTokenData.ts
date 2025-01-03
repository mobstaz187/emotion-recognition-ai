import { useState, useEffect } from 'react';
import { TokenData } from '../types/token';
import { analyzeFundamentals } from '../utils/analysis/fundamentalAnalysis';
import { calculateRSI, calculateMACD, calculateBollingerBands } from '../utils/analysis/technicalAnalysis';

const MOCK_PRICE_HISTORY = Array.from({ length: 30 }, () => 100 + Math.random() * 20 - 10);

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
        
        const pair = data.pairs[0];
        
        // Calculate technical indicators
        const technicalIndicators = {
          rsi: calculateRSI(MOCK_PRICE_HISTORY),
          macd: calculateMACD(MOCK_PRICE_HISTORY),
          bollingerBands: calculateBollingerBands(MOCK_PRICE_HISTORY),
          ema: {
            short: 0,
            medium: 0,
            long: 0
          }
        };

        // Parse holders count, handling different formats
        let holdersCount = 0;
        if (pair.holders) {
          // Remove commas and any non-numeric characters except decimal points
          const cleanedHolders = pair.holders.replace(/[^0-9.]/g, '');
          holdersCount = parseInt(cleanedHolders, 10);
        }

        // Basic metrics using actual data from DexScreener
        const metrics = {
          price: Number(pair.priceUsd) || 0,
          marketCap: Number(pair.fdv) || 0,
          volume24h: Number(pair.volume?.h24) || 0,
          priceChange24h: Number(pair.priceChange?.h24) || 0,
          holders: holdersCount,
          liquidity: Number(pair.liquidity?.usd) || 0,
          volatility: Math.abs(pair.priceChange?.h24 || 0) / 100
        };

        // Analyze metrics
        const { score: fundamentalScore } = analyzeFundamentals(metrics);
        const technicalScore = (technicalIndicators.rsi / 100) * 100;

        // Calculate overall sentiment
        const sentiment = {
          overall: Math.round((fundamentalScore + technicalScore) / 2),
          technical: Math.round(technicalScore),
          fundamental: Math.round(fundamentalScore)
        };

        setTokenData({
          name: pair.baseToken.name,
          symbol: pair.baseToken.symbol,
          website: pair.baseToken.website,
          twitter: pair.baseToken.twitter,
          telegram: pair.baseToken.telegram,
          ...metrics,
          technicalIndicators,
          sentiment
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