import { useState, useEffect } from 'react';
import { analyzeTimeframe } from '../utils/analysis/timeframeAnalysis';

interface TimeframeData {
  change: number;
  volume: number;
  trades: number;
  signals: Array<{
    type: 'bullish' | 'bearish' | 'neutral';
    message: string;
  }>;
}

interface TimeframeAnalysis {
  m30: TimeframeData;
}

export function useTimeframeAnalysis(address: string) {
  const [analysis, setAnalysis] = useState<TimeframeAnalysis>({
    m30: { change: 0, volume: 0, trades: 0, signals: [] }
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!address) return;

    async function fetchTimeframeData() {
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

        // Calculate 30m metrics
        const m30Data = {
          change: pair.priceChange?.h1 ? pair.priceChange.h1 / 2 : 0,
          volume: pair.volume?.h1 ? pair.volume.h1 / 2 : 0,
          trades: Math.round((pair.txns?.h1?.buys || 0 + pair.txns?.h1?.sells || 0) / 2)
        };

        // Analyze the timeframe data
        const m30Analysis = analyzeTimeframe(m30Data, '30m');

        setAnalysis({
          m30: {
            ...m30Data,
            signals: m30Analysis.signals
          }
        });
      } catch (error) {
        console.error('Error fetching timeframe data:', error);
        setAnalysis({
          m30: { change: 0, volume: 0, trades: 0, signals: [] }
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchTimeframeData();

    // Refresh data every minute
    const interval = setInterval(fetchTimeframeData, 60000);
    return () => clearInterval(interval);
  }, [address]);

  return { analysis, isLoading };
}