import { Candle, CandlePattern } from '../../../types/chart';

export function recognizePatterns(candles: Candle[]): CandlePattern[] {
  const patterns: CandlePattern[] = [];

  // Detect engulfing patterns
  for (let i = 1; i < candles.length; i++) {
    if (isEngulfingPattern(candles[i-1], candles[i])) {
      patterns.push({
        type: candles[i].isBullish ? 'bullish' : 'bearish',
        name: `${candles[i].isBullish ? 'Bullish' : 'Bearish'} Engulfing`,
        startIndex: i-1,
        endIndex: i,
        reliability: 0.75
      });
    }
  }

  // Detect doji patterns
  for (let i = 0; i < candles.length; i++) {
    if (isDojiPattern(candles[i])) {
      patterns.push({
        type: 'neutral',
        name: 'Doji',
        startIndex: i,
        endIndex: i,
        reliability: 0.65
      });
    }
  }

  // Detect hammer patterns
  for (let i = 0; i < candles.length; i++) {
    if (isHammerPattern(candles[i])) {
      patterns.push({
        type: 'bullish',
        name: 'Hammer',
        startIndex: i,
        endIndex: i,
        reliability: 0.7
      });
    }
  }

  return patterns;
}

function isEngulfingPattern(prev: Candle, curr: Candle): boolean {
  return curr.isBullish !== prev.isBullish && // Opposite colors
         Math.abs(curr.close - curr.open) > Math.abs(prev.close - prev.open) * 1.1; // Current engulfs previous
}

function isDojiPattern(candle: Candle): boolean {
  const bodySize = Math.abs(candle.close - candle.open);
  const wickSize = candle.low - candle.high;
  return bodySize < wickSize * 0.1; // Very small body compared to wicks
}

function isHammerPattern(candle: Candle): boolean {
  const bodySize = Math.abs(candle.close - candle.open);
  const lowerWick = Math.max(candle.close, candle.open) - candle.high;
  const upperWick = candle.low - Math.min(candle.close, candle.open);
  
  return upperWick > bodySize * 2 && // Long upper wick
         lowerWick < bodySize * 0.5; // Short lower wick
}