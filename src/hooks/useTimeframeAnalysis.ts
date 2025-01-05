import { useState, useEffect } from 'react';
import { TimeframeAnalysis, TimeframeData } from '../types/timeframe';
import { analyzeTimeframe } from '../utils/analysis/timeframeAnalysis';

const EMPTY_TIMEFRAME: TimeframeData = {
  change: 0,
  volume: 0,
  trades: 0,
  signals: []
};

export function useTimeframeAnalysis(address: string) {
  const [analysis, setAnalysis] = useState<TimeframeAnalysis>({
    h1: EMPTY_TIMEFRAME,
    m30: EMPTY_TIMEFRAME,
    m15: EMPTY_TIMEFRAME
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

        // Calculate metrics for each timeframe
        const h1Data: TimeframeData = {
          change: pair.priceChange?.h1 || 0,
          volume: pair.volume?.h1 || 0,
          trades: Math.round(pair.txns?.h1?.buys || 0 + pair.txns?.h1?.sells || 0),
          signals: []
        };

        const m30Data: TimeframeData = {
          change: h1Data.change / 2,
          volume: h1Data.volume / 2,
          trades: Math.round(h1Data.trades / 2),
          signals: []
        };

        const m15Data: TimeframeData = {
          change: h1Data.change / 4,
          volume: h1Data.volume / 4,
          trades: Math.round(h1Data.trades / 4),
          signals: []
        };

        // Analyze each timeframe
        const h1Analysis = analyzeTimeframe(h1Data, '1h');
        const m30Analysis = analyzeTimeframe(m30Data, '30m');
        const m15Analysis = analyzeTimeframe(m15Data, '15m');

        setAnalysis({
          h1: { ...h1Data, signals: h1Analysis.signals },
          m30: { ...m30Data, signals: m30Analysis.signals },
          m15: { ...m15Data, signals: m15Analysis.signals }
        });
      } catch (error) {
        console.error('Error fetching timeframe data:', error);
        setAnalysis({
          h1: EMPTY_TIMEFRAME,
          m30: EMPTY_TIMEFRAME,
          m15: EMPTY_TIMEFRAME
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