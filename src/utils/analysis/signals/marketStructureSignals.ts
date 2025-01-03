import { TokenMetrics, TechnicalIndicators } from '../../../types/token';

export function analyzeMarketStructure(metrics: TokenMetrics, technicals: TechnicalIndicators) {
  const signals = {
    bullish: [] as string[],
    bearish: [] as string[],
    neutral: [] as string[]
  };

  // Market Cap Dominance
  const mcapThreshold = 1000000; // $1M
  if (metrics.marketCap > mcapThreshold * 100) {
    signals.bullish.push(`Strong market presence with ${formatMarketCap(metrics.marketCap)} market cap`);
  } else if (metrics.marketCap < mcapThreshold) {
    signals.bearish.push(`Early stage project with ${formatMarketCap(metrics.marketCap)} market cap`);
  }

  // Price Support/Resistance Analysis
  const { bollingerBands } = technicals;
  const pricePosition = (metrics.price - bollingerBands.lower) / 
    (bollingerBands.upper - bollingerBands.lower);

  if (pricePosition > 0.8) {
    signals.bearish.push('Price near strong resistance level');
  } else if (pricePosition < 0.2) {
    signals.bullish.push('Price near strong support level');
  }

  // Liquidity Depth
  const liquidityRatio = metrics.liquidity / metrics.volume24h;
  if (liquidityRatio > 2) {
    signals.bullish.push(`Deep liquidity with ${liquidityRatio.toFixed(6)}x daily volume`);
  } else if (liquidityRatio < 0.5) {
    signals.bearish.push(`Shallow liquidity with only ${liquidityRatio.toFixed(6)}x daily volume`);
  }

  return signals;
}

function formatMarketCap(mcap: number): string {
  if (mcap >= 1e9) return `$${(mcap / 1e9).toFixed(2)}B`;
  if (mcap >= 1e6) return `$${(mcap / 1e6).toFixed(2)}M`;
  return `$${(mcap / 1e3).toFixed(2)}K`;
}