import { TimeframeData } from '../../types/timeframe';

interface Signal {
  type: 'bullish' | 'bearish' | 'neutral';
  message: string;
}

interface TimeframeAnalysisResult {
  sentiment: 'bullish' | 'bearish' | 'neutral';
  signals: Signal[];
}

export function analyzeTimeframe(
  data: TimeframeData,
  timeframe: '30m'
): TimeframeAnalysisResult {
  const signals: Signal[] = [];
  const sentiment: 'bullish' | 'bearish' | 'neutral' = 'neutral';

  // Analyze volume
  if (data.volume > 0) {
    const volumePerTrade = data.volume / (data.trades || 1);
    if (volumePerTrade > 1000) {
      signals.push({
        type: 'bullish',
        message: `High volume per trade: $${volumePerTrade.toFixed(2)}`
      });
    }
  }

  // Analyze price change
  if (data.change > 0) {
    signals.push({
      type: 'bullish',
      message: `Price increased by ${data.change.toFixed(2)}%`
    });
  } else if (data.change < 0) {
    signals.push({
      type: 'bearish',
      message: `Price decreased by ${Math.abs(data.change).toFixed(2)}%`
    });
  }

  return { sentiment, signals };
}