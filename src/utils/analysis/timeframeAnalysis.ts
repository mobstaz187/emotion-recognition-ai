import { TimeframeData, TimeframeSignal } from '../../types/timeframe';

interface TimeframeAnalysisResult {
  sentiment: 'bullish' | 'bearish' | 'neutral';
  signals: TimeframeSignal[];
}

export function analyzeTimeframe(
  data: TimeframeData,
  timeframe: string
): TimeframeAnalysisResult {
  const signals: TimeframeSignal[] = [];
  let bullishCount = 0;
  let bearishCount = 0;

  // Price Change Analysis
  if (Math.abs(data.change) > 0) {
    if (data.change > 0) {
      signals.push({
        type: 'bullish',
        message: `Price increased by ${data.change.toFixed(3)}% in last ${timeframe}`
      });
      bullishCount++;
    } else {
      signals.push({
        type: 'bearish',
        message: `Price decreased by ${Math.abs(data.change).toFixed(3)}% in last ${timeframe}`
      });
      bearishCount++;
    }
  }

  // Volume Analysis
  if (data.volume > 0) {
    const volumePerTrade = data.volume / (data.trades || 1);
    if (volumePerTrade > 1000) {
      signals.push({
        type: 'bullish',
        message: `High volume per trade: $${formatNumber(volumePerTrade)}`
      });
      bullishCount++;
    } else if (volumePerTrade < 100) {
      signals.push({
        type: 'bearish',
        message: `Low volume per trade: $${formatNumber(volumePerTrade)}`
      });
      bearishCount++;
    }
  }

  // Determine overall sentiment
  let sentiment: 'bullish' | 'bearish' | 'neutral';
  if (bullishCount > bearishCount) {
    sentiment = 'bullish';
  } else if (bearishCount > bullishCount) {
    sentiment = 'bearish';
  } else {
    sentiment = 'neutral';
  }

  return { sentiment, signals };
}

function formatNumber(num: number): string {
  if (num >= 1e6) return (num / 1e6).toFixed(3) + 'M';
  if (num >= 1e3) return (num / 1e3).toFixed(3) + 'K';
  return num.toFixed(3);
}