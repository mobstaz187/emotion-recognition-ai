import { TokenMetrics } from '../../../types/token';

export function analyzeHolderSignals(metrics: TokenMetrics) {
  const signals = {
    bullish: [] as string[],
    bearish: [] as string[],
    neutral: [] as string[]
  };

  // Holder Count Analysis
  if (metrics.holders > 10000) {
    signals.bullish.push(`Strong community with ${metrics.holders.toLocaleString()} holders`);
  } else if (metrics.holders > 5000) {
    signals.bullish.push(`Growing community with ${metrics.holders.toLocaleString()} holders`);
  } else if (metrics.holders > 1000) {
    signals.neutral.push(`Developing community with ${metrics.holders.toLocaleString()} holders`);
  } else if (metrics.holders > 0) {
    signals.bearish.push(`Early stage with ${metrics.holders.toLocaleString()} holders`);
  }

  return signals;
}