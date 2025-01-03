import { TokenMetrics } from '../../../types/token';

export function analyzePriceSignals(metrics: TokenMetrics) {
  const signals = {
    bullish: [] as string[],
    bearish: [] as string[],
    neutral: [] as string[]
  };

  // Price Change Analysis
  if (metrics.priceChange24h > 20) {
    signals.bullish.push(`Strong upward momentum with ${metrics.priceChange24h.toFixed(1)}% gain`);
  } else if (metrics.priceChange24h > 5) {
    signals.bullish.push(`Positive price action with ${metrics.priceChange24h.toFixed(1)}% gain`);
  } else if (metrics.priceChange24h < -20) {
    signals.bearish.push(`Sharp decline with ${Math.abs(metrics.priceChange24h).toFixed(1)}% loss`);
  } else if (metrics.priceChange24h < -5) {
    signals.bearish.push(`Negative price action with ${Math.abs(metrics.priceChange24h).toFixed(1)}% loss`);
  } else {
    signals.neutral.push(`Stable price action with ${metrics.priceChange24h.toFixed(1)}% change`);
  }

  // Volatility Analysis
  if (metrics.volatility > 0.2) {
    signals.bearish.push(`High volatility at ${(metrics.volatility * 100).toFixed(1)}%`);
  } else if (metrics.volatility < 0.05) {
    signals.neutral.push(`Low volatility at ${(metrics.volatility * 100).toFixed(1)}%`);
  }

  return signals;
}