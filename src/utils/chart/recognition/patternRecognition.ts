import { Candle, CandlePattern, Point } from '../../../types/chart';

export function recognizePatterns(candles: Candle[]): CandlePattern[] {
  const patterns: CandlePattern[] = [];

  if (isBullishEngulfing(candles)) {
    patterns.push({
      type: 'bullish',
      name: 'Bullish Engulfing',
      description: 'A bullish reversal pattern',
      reliability: 0.75,
      points: generatePatternPoints(candles),
      confidence: 0.8
    });
  }

  return patterns;
}

function isBullishEngulfing(candles: Candle[]): boolean {
  if (candles.length < 2) return false;
  const [prev, curr] = candles.slice(-2);
  return !prev.isBullish && curr.isBullish && curr.open < prev.close && curr.close > prev.open;
}

function generatePatternPoints(candles: Candle[]): Point[] {
  return candles.map((candle, index) => ({
    x: index,
    y: candle.close
  }));
}