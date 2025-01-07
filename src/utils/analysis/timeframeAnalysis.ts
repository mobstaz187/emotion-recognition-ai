import { TimeframeData, TimeframeSignal } from '../../types/timeframe';

export function analyzeTimeframe(data: TimeframeData, timeframe: string): {
  sentiment: 'bullish' | 'bearish' | 'neutral';
  signals: TimeframeSignal[];
} {
  const signals: TimeframeSignal[] = [];

  // Price change analysis
  if (Math.abs(data.change) > 0) {
    if (data.change > 3) {
      signals.push({
        type: 'bullish',
        message: `Strong upward movement of ${data.change.toFixed(2)}% in ${timeframe}`
      });
    } else if (data.change > 1) {
      signals.push({
        type: 'bullish',
        message: `Positive price action of ${data.change.toFixed(2)}% in ${timeframe}`
      });
    } else if (data.change < -3) {
      signals.push({
        type: 'bearish',
        message: `Sharp decline of ${Math.abs(data.change).toFixed(2)}% in ${timeframe}`
      });
    } else if (data.change < -1) {
      signals.push({
        type: 'bearish',
        message: `Negative price action of ${Math.abs(data.change).toFixed(2)}% in ${timeframe}`
      });
    } else {
      signals.push({
        type: 'neutral',
        message: `Sideways movement with ${Math.abs(data.change).toFixed(2)}% change`
      });
    }
  }

  // Volume analysis
  if (data.volume > 100000) {
    signals.push({
      type: 'bullish',
      message: `High trading volume of $${formatNumber(data.volume)}`
    });
  } else if (data.volume > 50000) {
    signals.push({
      type: 'neutral',
      message: `Moderate volume of $${formatNumber(data.volume)}`
    });
  } else {
    signals.push({
      type: 'bearish',
      message: `Low trading volume of $${formatNumber(data.volume)}`
    });
  }

  // Trade frequency analysis
  const tradesPerMinute = data.trades / parseInt(timeframe);
  if (tradesPerMinute > 5) {
    signals.push({
      type: 'bullish',
      message: `High trading activity with ${tradesPerMinute.toFixed(1)} trades/min`
    });
  } else if (tradesPerMinute > 2) {
    signals.push({
      type: 'neutral',
      message: `Normal trading activity with ${tradesPerMinute.toFixed(1)} trades/min`
    });
  } else {
    signals.push({
      type: 'bearish',
      message: `Low trading activity with ${tradesPerMinute.toFixed(1)} trades/min`
    });
  }

  // Determine overall sentiment
  const bullishCount = signals.filter(s => s.type === 'bullish').length;
  const bearishCount = signals.filter(s => s.type === 'bearish').length;
  
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
  if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
  if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
  return num.toFixed(2);
}