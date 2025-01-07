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
    m1: EMPTY_TIMEFRAME,
    m15: EMPTY_TIMEFRAME,
    m30: EMPTY_TIMEFRAME,
    h1: EMPTY_TIMEFRAME,
    h4: EMPTY_TIMEFRAME,
    h24: EMPTY_TIMEFRAME
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

        // Calculate trades for each timeframe
        const m1Trades = Math.round((pair.txns?.m5?.buys || 0) + (pair.txns?.m5?.sells || 0)) / 5;
        const m15Trades = Math.round((pair.txns?.h1?.buys || 0) + (pair.txns?.h1?.sells || 0)) / 4;
        const m30Trades = Math.round((pair.txns?.h1?.buys || 0) + (pair.txns?.h1?.sells || 0)) / 2;
        const h1Trades = Math.round((pair.txns?.h1?.buys || 0) + (pair.txns?.h1?.sells || 0));
        const h4Trades = Math.round((pair.txns?.h24?.buys || 0) + (pair.txns?.h24?.sells || 0)) / 6;
        const h24Trades = Math.round((pair.txns?.h24?.buys || 0) + (pair.txns?.h24?.sells || 0));

        // Create timeframe data objects
        const m1Data: TimeframeData = {
          change: pair.priceChange?.m5 / 5 || 0,
          volume: (pair.volume?.h1 || 0) / 60,
          trades: m1Trades,
          signals: []
        };

        const m15Data: TimeframeData = {
          change: pair.priceChange?.m15 || pair.priceChange?.h1 / 4 || 0,
          volume: pair.volume?.m15 || (pair.volume?.h1 || 0) / 4,
          trades: m15Trades,
          signals: []
        };

        const m30Data: TimeframeData = {
          change: pair.priceChange?.m30 || pair.priceChange?.h1 / 2 || 0,
          volume: pair.volume?.m30 || (pair.volume?.h1 || 0) / 2,
          trades: m30Trades,
          signals: []
        };

        const h1Data: TimeframeData = {
          change: pair.priceChange?.h1 || 0,
          volume: pair.volume?.h1 || 0,
          trades: h1Trades,
          signals: []
        };

        const h4Data: TimeframeData = {
          change: pair.priceChange?.h24 / 6 || 0,
          volume: (pair.volume?.h24 || 0) / 6,
          trades: h4Trades,
          signals: []
        };

        const h24Data: TimeframeData = {
          change: pair.priceChange?.h24 || 0,
          volume: pair.volume?.h24 || 0,
          trades: h24Trades,
          signals: []
        };

        // Analyze each timeframe
        const m1Analysis = analyzeTimeframe(m1Data, '1m');
        const m15Analysis = analyzeTimeframe(m15Data, '15m');
        const m30Analysis = analyzeTimeframe(m30Data, '30m');
        const h1Analysis = analyzeTimeframe(h1Data, '1h');
        const h4Analysis = analyzeTimeframe(h4Data, '4h');
        const h24Analysis = analyzeTimeframe(h24Data, '24h');

        setAnalysis({
          m1: { ...m1Data, signals: m1Analysis.signals },
          m15: { ...m15Data, signals: m15Analysis.signals },
          m30: { ...m30Data, signals: m30Analysis.signals },
          h1: { ...h1Data, signals: h1Analysis.signals },
          h4: { ...h4Data, signals: h4Analysis.signals },
          h24: { ...h24Data, signals: h24Analysis.signals }
        });
      } catch (error) {
        console.error('Error fetching timeframe data:', error);
        setAnalysis({
          m1: EMPTY_TIMEFRAME,
          m15: EMPTY_TIMEFRAME,
          m30: EMPTY_TIMEFRAME,
          h1: EMPTY_TIMEFRAME,
          h4: EMPTY_TIMEFRAME,
          h24: EMPTY_TIMEFRAME
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchTimeframeData();

    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchTimeframeData, 30000);
    return () => clearInterval(interval);
  }, [address]);

  return { analysis, isLoading };
}