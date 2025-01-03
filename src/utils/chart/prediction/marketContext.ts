import { Candle } from '../../../types/chart';
import { PricePrediction } from './pricePredictor';

export function analyzeMarketContext(
  candles: Candle[],
  volatility: number
): PricePrediction {
  const momentum = calculateMomentum(candles);
  const volume = calculateVolumeProfile(candles);
  const trend = analyzeTrend(candles);

  const direction = determineDirection(momentum, volume, trend);
  const confidence = calculateConfidence(momentum, volume, trend);
  const targetPrice = calculateTarget(candles[candles.length - 1].close, direction, volatility);

  return {
    direction,
    targetPrice,
    confidence,
    reason: generateReason(direction, momentum, volume, trend)
  };
}

function calculateMomentum(candles: Candle[]): number {
  const period = Math.min(14, candles.length);
  const recentCandles = candles.slice(-period);
  return (recentCandles[recentCandles.length - 1].close - recentCandles[0].close) / 
         recentCandles[0].close;
}

function calculateVolumeProfile(candles: Candle[]): number {
  // Mock volume calculation for demo
  return Math.random();
}

function analyzeTrend(candles: Candle[]): 'up' | 'down' | 'sideways' {
  const momentum = calculateMomentum(candles);
  if (Math.abs(momentum) < 0.01) return 'sideways';
  return momentum > 0 ? 'up' : 'down';
}

function determineDirection(
  momentum: number,
  volume: number,
  trend: 'up' | 'down' | 'sideways'
): 'up' | 'down' | 'sideways' {
  if (Math.abs(momentum) < 0.01) return 'sideways';
  if (volume > 0.7) return trend;
  return momentum > 0 ? 'up' : 'down';
}

function calculateConfidence(
  momentum: number,
  volume: number,
  trend: 'up' | 'down' | 'sideways'
): number {
  const momentumStrength = Math.min(Math.abs(momentum) * 10, 1);
  const volumeStrength = Math.min(volume, 1);
  const trendStrength = trend === 'sideways' ? 0.5 : 0.8;
  
  return (momentumStrength + volumeStrength + trendStrength) / 3;
}

function calculateTarget(
  currentPrice: number,
  direction: 'up' | 'down' | 'sideways',
  volatility: number
): number {
  const moveSize = volatility * 2;
  switch (direction) {
    case 'up':
      return currentPrice * (1 + moveSize);
    case 'down':
      return currentPrice * (1 - moveSize);
    default:
      return currentPrice;
  }
}

function generateReason(
  direction: 'up' | 'down' | 'sideways',
  momentum: number,
  volume: number,
  trend: 'up' | 'down' | 'sideways'
): string {
  const momentumStr = Math.abs(momentum) > 0.02 ? 'strong' : 'weak';
  const volumeStr = volume > 0.7 ? 'high' : 'low';
  
  return `${direction.toUpperCase()} prediction based on ${momentumStr} momentum, ${volumeStr} volume, and ${trend} trend`;
}