import { Candle } from '../../../types/chart';
import { detectStructureShift } from '../analysis/structureAnalysis';
import { calculateVolatility } from './volatility';
import { getPredictionFromStructure } from './structurePrediction';
import { analyzeMarketContext } from './marketContext';

export interface PricePrediction {
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