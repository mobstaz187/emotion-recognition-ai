import { Candle } from '../../../types/chart';
import { findKeyLevels } from './levels';

interface StructureShift {
  type: 'support' | 'resistance' | 'trend';
  direction: 'break' | 'bounce';
  strength: number;
  price: number;
}

export function analyzeLevel(
  candle: Candle,
  level: { price: number; type: 'support' | 'resistance' },
  recentCandles: Candle[]
): StructureShift | null {
  const priceDistance = Math.abs(candle.close - level.price) / level.price;
  const momentum = calculateMomentum(recentCandles);

  if (priceDistance < 0.005) { // Within 0.5% of level
    const isBreak = level.type === 'support' ? 
      candle.close < level.price :
      candle.close > level.price;

    if (isBreak && Math.abs(momentum) > 0.02) {
      return {
        type: level.type,
        direction: 'break',
        strength: Math.min(Math.abs(momentum) * 50, 1),
        price: level.price
      };
    }

    if (!isBreak && Math.abs(momentum) < 0.01) {
      return {
        type: level.type,
        direction: 'bounce',
        strength: 0.7,
        price: level.price
      };
    }
  }

  return null;
}

function calculateMomentum(candles: Candle[]): number {
  const prices = candles.map(c => c.close);
  return (prices[prices.length - 1] - prices[0]) / prices[0];
}

export function detectStructureShift(candles: Candle[]): StructureShift | null {
  if (candles.length < 10) return null;

  const recentCandles = candles.slice(-10);
  const lastCandle = recentCandles[recentCandles.length - 1];
  const levels = findKeyLevels(recentCandles);

  for (const level of levels) {
    const shift = analyzeLevel(lastCandle, level, recentCandles);
    if (shift) return shift;
  }

  return null;
}