import { Candle } from '../../../types/chart';
import { detectStructureShift } from '../analysis/structureAnalysis';

interface PricePrediction {
  direction: 'up' | 'down' | 'sideways';
  targetPrice: number;
  confidence: number;
  reason: string;
}

export function predictNextMove(candles: Candle[]): PricePrediction {
  const structureShift = detectStructureShift(candles);
  const lastCandle = candles[candles.length - 1];
  const volatility = calculateVolatility(candles);
  
  // If we detect a structure break/bounce, use that for prediction
  if (structureShift) {
    const prediction = getPredictionFromStructure(structureShift, lastCandle, volatility);
    if (prediction) return prediction;
  }

  // Fallback to momentum and pattern analysis
  return analyzeMarketContext(candles, volatility);
}

function getPredictionFromStructure(
  shift: ReturnType<typeof detectStructureShift>,
  lastCandle: Candle,
  volatility: number
): PricePrediction | null {
  if (!shift) return null;

  const moveSize = volatility * 2; // Expected move size based on volatility
  
  if (shift.direction === 'break') {
    const direction = shift.type === 'resistance' ? 'up' : 'down';
    return {
      direction,
      targetPrice: direction === 'up' 
        ? lastCandle.close + moveSize
        : lastCandle.close - moveSize,
      confidence: shift.strength * 0.8,
      reason: `${shift.type} level break with strong momentum`
    };
  }
  
  if (shift.direction === 'bounce') {
    const direction = shift.type === 'support' ? 'up' : 'down';
    return {
      direction,
      targetPrice: direction === 'up'
        ? lastCandle.close + moveSize
        : lastCandle.close - moveSize,
      confidence: shift.strength * 0.7,
      reason: `Strong ${shift.type} level bounce`
    };
  }

  return null;
}

function analyzeMarketContext(candles: Candle[], volatility: number): PricePrediction {
  const recentCandles = candles.slice(-5);
  const lastCandle = recentCandles[recentCandles.length - 1];
  
  // Calculate momentum
  const momentum = calculateMomentum(recentCandles);
  const moveSize = volatility * 1.5;

  if (Math.abs(momentum) > 0.7) {
    return {
      direction: momentum > 0 ? 'up' : 'down',
      targetPrice: momentum > 0 
        ? lastCandle.close + moveSize
        : lastCandle.close - moveSize,
      confidence: Math.abs(momentum) * 0.6,
      reason: `Strong ${momentum > 0 ? 'bullish' : 'bearish'} momentum`
    };
  }

  // Default to sideways if no clear direction
  return {
    direction: 'sideways',
    targetPrice: lastCandle.close,
    confidence: 0.4,
    reason: 'No clear directional bias'
  };
}

function calculateVolatility(candles: Candle[]): number {
  const returns = candles.slice(1).map((candle, i) => 
    Math.log(candle.close / candles[i].close)
  );
  
  const mean = returns.reduce((sum, r) => sum + r, 0) / returns.length;
  const variance = returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / returns.length;
  
  return Math.sqrt(variance);
}

function calculateMomentum(candles: Candle[]): number {
  const closes = candles.map(c => c.close);
  const firstClose = closes[0];
  const lastClose = closes[closes.length - 1];
  
  return (lastClose - firstClose) / firstClose;
}