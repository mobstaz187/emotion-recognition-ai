import { TokenMetrics } from '../../../types/token';

export function analyzeVolumeSignals(metrics: TokenMetrics) {
  const signals = {
    bullish: [] as string[],
    bearish: [] as string[],
    neutral: [] as string[]
  };

  // Volume to Market Cap Ratio
  const volumeToMcap = metrics.volume24h / metrics.marketCap;
  if (volumeToMcap > 0.3) {
    signals.bullish.push(`High trading volume at ${(volumeToMcap * 100).toFixed(6)}% of market cap`);
  } else if (volumeToMcap < 0.05) {
    signals.bearish.push(`Low trading volume at ${(volumeToMcap * 100).toFixed(6)}% of market cap`);
  }

  // Volume Trend Analysis
  if (metrics.volume24h < metrics.marketCap * 0.01) {
    signals.bearish.push('Declining volume');
  }

  return signals;
}