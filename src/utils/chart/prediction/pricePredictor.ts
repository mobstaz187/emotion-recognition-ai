import { Candle } from '../../../types/chart';

export interface PricePrediction {
  direction: 'up' | 'down' | 'sideways';
  targetPrice: number;
  confidence: number;
  reason: string;
}

export function predictPrice(candles: Candle[]): PricePrediction {
  return {
    direction: 'sideways',
    targetPrice: 0,
    confidence: 0,
    reason: ''
  };
}