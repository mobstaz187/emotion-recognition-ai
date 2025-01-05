import { Candle, CandlePattern } from '../../../types/chart';

export function recognizePatterns(candles: Candle[]): CandlePattern[] {
  const patterns: CandlePattern[] = [];

  // Pattern recognition logic
  if (isBullishEngulfing(candles)) {
    patterns.push({
      type: 'bullish',
      name: 'Bullish Engulfing',
      description: 'A bullish reversal pattern',
      reliability: 0.75
    });
  }

  return patterns;
}

function isBullishEngulfing(candles: Candle[]): boolean {
  if (candles.length < 2) return false;
  const [prev, curr] = candles.slice(-2);
  return !prev.isBullish && curr.isBullish && curr.open < prev.close && curr.close > prev.open;
}