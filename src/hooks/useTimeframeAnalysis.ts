import { useState, useCallback, useEffect } from 'react';
import { TimeframeAnalysis, TimeframeData } from '../types/timeframe';

const EMPTY_TIMEFRAME: TimeframeData = {
  change: 0,
  volume: 0,
  trades: 0,
  signals: []
};

const INITIAL_ANALYSIS: TimeframeAnalysis = {
  m1: EMPTY_TIMEFRAME,
  m15: EMPTY_TIMEFRAME,
  m30: EMPTY_TIMEFRAME,
  h1: EMPTY_TIMEFRAME,
  h4: EMPTY_TIMEFRAME,
  h24: EMPTY_TIMEFRAME
};

export function useTimeframeAnalysis(address: string) {
  const [analysis, setAnalysis] = useState<TimeframeAnalysis>(INITIAL_ANALYSIS);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!address) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.dexscreener.com/latest/dex/tokens/${address}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch timeframe data');
      }
      
      const data = await response.json();
      const pair = data.pairs?.[0];
      
      if (!pair) {
        throw new Error('No pair data found');
      }

      // Calculate metrics for each timeframe
      const timeframes = {
        m1: { minutes: 1, divider: 60 },
        m15: { minutes: 15, divider: 4 },
        m30: { minutes: 30, divider: 2 },
        h1: { minutes: 60, divider: 1 },
        h4: { minutes: 240, divider: 0.25 },
        h24: { minutes: 1440, divider: 0.0417 }
      };

      const newAnalysis = Object.entries(timeframes).reduce((acc, [key, { divider }]) => {
        const baseData = {
          change: (pair.priceChange?.h24 || 0) * divider,
          volume: (pair.volume?.h24 || 0) * divider,
          trades: Math.round((pair.txns?.h24?.buys || 0 + pair.txns?.h24?.sells || 0) * divider),
          signals: []
        };

        return {
          ...acc,
          [key]: baseData
        };
      }, {} as TimeframeAnalysis);

      setAnalysis(newAnalysis);
    } catch (error) {
      console.error('Error fetching timeframe data:', error);
      setAnalysis(INITIAL_ANALYSIS);
    } finally {
      setIsLoading(false);
    }
  }, [address]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [fetchData]);

  return { analysis, isLoading, fetchData };
}