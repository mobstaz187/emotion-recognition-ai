import { Candle } from '../../../types/chart';

interface StructureShift {
  type: 'support' | 'resistance' | 'trend';
  direction: 'break' | 'bounce';
  strength: number;
  price: number;
}

export function detectStructureShift(candles: Candle[]): StructureShift | null {
  if (candles.length < 10) return null;

  const recentCandles = candles.slice(-10);
  const lastCandle = recentCandles[recentCandles.length - 1];
  
  // Detect support/resistance levels
  const levels = findKeyLevels(recentCandles);
  
  // Check for breaks or bounces
  for (const level of levels) {
    const shift = analyzeLevel(lastCandle, level, recentCandles);
    if (shift) return shift;
  }

  return null;
}

function findKeyLevels(candles: Candle[]) {
  const levels: Array<{ price: number; touches: number; type: 'support' | 'resistance' }> = [];
  
  for (let i = 0; i < candles.length - 2; i++) {
    const current = candles[i];
    
    // Look for price rejection points
    if (isLocalHigh(candles, i)) {
      addOrUpdateLevel(levels, current.high, 'resistance');
    }
    if (isLocalLow(candles, i)) {
      addOrUpdateLevel(levels, current.low, 'support');
    }
  }

  return levels.filter(l => l.touches >= 2); // Return only validated levels
}

function analyzeLevel(
  lastCandle: Candle,
  level: { price: number; type: 'support' | 'resistance' },
  recentCandles: Candle[]
): StructureShift | null {
  const threshold = getVolatility(recentCandles) * 1.5;
  
  if (level.type === 'support') {
    if (lastCandle.close < level.price - threshold) {
      return {
        type: 'support',
        direction: 'break',
        strength: calculateBreakStrength(lastCandle, level.price),
        price: level.price
      };
    }
    if (Math.abs(lastCandle.low - level.price) < threshold && lastCandle.close > lastCandle.open) {
      return {
        type: 'support',
        direction: 'bounce',
        strength: calculateBounceStrength(lastCandle, level.price),
        price: level.price
      };
    }
  } else {
    if (lastCandle.close > level.price + threshold) {
      return {
        type: 'resistance',
        direction: 'break',
        strength: calculateBreakStrength(lastCandle, level.price),
        price: level.price
      };
    }
    if (Math.abs(lastCandle.high - level.price) < threshold && lastCandle.close < lastCandle.open) {
      return {
        type: 'resistance',
        direction: 'bounce',
        strength: calculateBounceStrength(lastCandle, level.price),
        price: level.price
      };
    }
  }

  return null;
}

function isLocalHigh(candles: Candle[], index: number): boolean {
  const window = 2;
  const current = candles[index];
  
  for (let i = Math.max(0, index - window); i <= Math.min(candles.length - 1, index + window); i++) {
    if (i !== index && candles[i].high > current.high) return false;
  }
  
  return true;
}

function isLocalLow(candles: Candle[], index: number): boolean {
  const window = 2;
  const current = candles[index];
  
  for (let i = Math.max(0, index - window); i <= Math.min(candles.length - 1, index + window); i++) {
    if (i !== index && candles[i].low < current.low) return false;
  }
  
  return true;
}

function getVolatility(candles: Candle[]): number {
  const highs = candles.map(c => c.high);
  const lows = candles.map(c => c.low);
  return (Math.max(...highs) - Math.min(...lows)) / candles.length;
}

function calculateBreakStrength(candle: Candle, levelPrice: number): number {
  const bodySize = Math.abs(candle.close - candle.open);
  const breakSize = Math.abs(candle.close - levelPrice);
  return Math.min(breakSize / bodySize, 1);
}

function calculateBounceStrength(candle: Candle, levelPrice: number): number {
  const bodySize = Math.abs(candle.close - candle.open);
  const wickSize = candle.high - candle.low;
  return Math.min(bodySize / wickSize, 1);
}

function addOrUpdateLevel(
  levels: Array<{ price: number; touches: number; type: 'support' | 'resistance' }>,
  price: number,
  type: 'support' | 'resistance'
) {
  const threshold = 0.001; // 0.1% price difference
  const existing = levels.find(l => 
    Math.abs(l.price - price) / price < threshold && l.type === type
  );
  
  if (existing) {
    existing.touches++;
    existing.price = (existing.price + price) / 2; // Average the level
  } else {
    levels.push({ price, touches: 1, type });
  }
}