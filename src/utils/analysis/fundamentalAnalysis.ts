import { TokenMetrics } from '../../types/token';

export function analyzeFundamentals(metrics: TokenMetrics): {
  score: number;
  insights: string[];
} {
  const insights: string[] = [];
  let score = 0;

  // Market Cap Analysis
  const marketCapScore = analyzeMarketCap(metrics);
  score += marketCapScore.score;
  insights.push(...marketCapScore.insights);

  // Liquidity Analysis
  const liquidityScore = analyzeLiquidity(metrics);
  score += liquidityScore.score;
  insights.push(...liquidityScore.insights);

  // Holder Analysis
  const holderScore = analyzeHolders(metrics);
  score += holderScore.score;
  insights.push(...holderScore.insights);

  // Volatility Analysis
  const volatilityScore = analyzeVolatility(metrics);
  score += volatilityScore.score;
  insights.push(...volatilityScore.insights);

  return {
    score: score / 4,
    insights
  };
}

function analyzeMarketCap(metrics: TokenMetrics) {
  const insights: string[] = [];
  let score = 0;

  const mcapToVolume = metrics.marketCap / metrics.volume24h;

  if (mcapToVolume > 10) {
    score += 25;
    insights.push('Healthy market cap to volume ratio indicates stability');
  }

  if (metrics.marketCap > 100000000) {
    score += 25;
    insights.push('Large market cap suggests established project');
  }

  return { score, insights };
}

function analyzeLiquidity(metrics: TokenMetrics) {
  const insights: string[] = [];
  let score = 0;

  const liquidityRatio = metrics.liquidity / metrics.marketCap;

  if (liquidityRatio > 0.1) {
    score += 25;
    insights.push('Strong liquidity ratio indicates healthy trading environment');
  }

  if (metrics.liquidity > 1000000) {
    score += 25;
    insights.push('High liquidity reduces potential for price manipulation');
  }

  return { score, insights };
}

function analyzeHolders(metrics: TokenMetrics) {
  const insights: string[] = [];
  let score = 0;

  if (metrics.holders > 10000) {
    score += 25;
    insights.push('Large holder base indicates wide distribution');
  }

  const avgHolding = metrics.marketCap / metrics.holders;
  if (avgHolding < metrics.marketCap * 0.01) {
    score += 25;
    insights.push('Well-distributed token ownership reduces whale impact');
  }

  return { score, insights };
}

function analyzeVolatility(metrics: TokenMetrics) {
  const insights: string[] = [];
  let score = 0;

  if (metrics.volatility < 0.1) {
    score += 25;
    insights.push('Low volatility indicates price stability');
  }

  if (Math.abs(metrics.priceChange24h) < 10) {
    score += 25;
    insights.push('Moderate price movement suggests market maturity');
  }

  return { score, insights };
}