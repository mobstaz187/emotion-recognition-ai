import { Candle, PriceLevel } from '../../../types/chart';

export function findKeyLevels(candles: Candle[]): PriceLevel[] {
  const levels: PriceLevel[] = [];
  const priceThreshold = 0.001; // 0.1% price difference

  for (let i = 2; i < candles.length - 2; i++) {
    const current = candles[i];

    // Check for potential support/resistance levels
    if (isSwingHigh(candles, i)) {
      addOrUpdateLevel(levels, current.high, 'resistance', priceThreshold);
    }
    if (isSwingLow(candles, i)) {
      addOrUpdateLevel(levels, current.low, 'support', priceThreshold);
    }
  }

  return levels.filter(level => level.strength >= 2);
}

function isSwingHigh(candles: Candle[], index: number): boolean {
  const current = candles[index];
  return candles[index - 2].high < current.high &&
         candles[index - 1].high < current.high &&
         candles[index + 1].high < current.high &&
         candles[index + 2].high < current.high;
}

function isSwingLow(candles: Candle[], index: number): boolean {
  const current = candles[index];
  return candles[index - 2].low > current.low &&
         candles[index - 1].low > current.low &&
         candles[index + 1].low > current.low &&
         candles[index + 2].low > current.low;
}

function addOrUpdateLevel(
  levels: PriceLevel[],
  price: number,
  type: 'support' | 'resistance',
  threshold: number
): void {
  const existingLevel = levels.find(level => 
    Math.abs(level.price - price) / price < threshold &&
    level.type === type
  );

  if (existingLevel) {
    existingLevel.strength++;
    existingLevel.price = (existingLevel.price + price) / 2;
  } else {
    levels.push({ price, strength: 1, type });
  }
}