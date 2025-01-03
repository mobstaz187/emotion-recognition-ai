import { TokenMetrics, TechnicalIndicators } from '../../../types/token';

export function analyzeMomentum(metrics: TokenMetrics, technicals: TechnicalIndicators) {
  const signals = {
    bullish: [] as string[],
    bearish: [] as string[],
    neutral: [] as string[]
  };

  // Volume Momentum
  const volumeChange = metrics.volume24h / (metrics.marketCap * 0.1); // 10% baseline
  if (volumeChange > 3) {
    signals.bullish.push(`Surging volume at ${volumeChange.toFixed(6)}x normal levels`);
  } else if (volumeChange < 0.3) {
    signals.bearish.push(`Declining volume at ${volumeChange.toFixed(6)}x normal levels`);
  }

  // Price Momentum
  const { macd } = technicals;
  const macdStrength = Math.abs(macd.histogram / macd.signal);
  
  if (macd.histogram > 0 && macdStrength > 1.5) {
    signals.bullish.push(`Strong bullish momentum with ${macdStrength.toFixed(6)}x MACD strength`);
  } else if (macd.histogram < 0 && macdStrength > 1.5) {
    signals.bearish.push(`Strong bearish momentum with ${macdStrength.toFixed(6)}x MACD strength`);
  }

  // Trend Strength
  const trendStrength = Math.abs(metrics.priceChange24h) / metrics.volatility;
  if (trendStrength > 2 && metrics.priceChange24h > 0) {
    signals.bullish.push(`Strong uptrend with ${trendStrength.toFixed(6)}x volatility gain`);
  } else if (trendStrength > 2 && metrics.priceChange24h < 0) {
    signals.bearish.push(`Strong downtrend with ${trendStrength.toFixed(6)}x volatility loss`);
  }

  return signals;
}