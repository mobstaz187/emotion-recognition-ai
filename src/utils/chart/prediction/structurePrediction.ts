import { Candle } from '../../../types/chart';
import { PricePrediction } from './pricePredictor';

interface StructureShift {
  type: 'support' | 'resistance' | 'trend';
  direction: 'break' | 'bounce';
  strength: number;
  price: number;
}

export function getPredictionFromStructure(
  shift: StructureShift,
  lastCandle: Candle,
  volatility: number
): PricePrediction {
  const moveSize = volatility * lastCandle.close * 2;
  const direction = getDirectionFromShift(shift);
  const targetPrice = calculateTargetPrice(lastCandle.close, direction, moveSize);
  
  return {
    direction,
    targetPrice,
    confidence: shift.strength,
    reason: `${shift.type.charAt(0).toUpperCase() + shift.type.slice(1)} ${shift.direction} detected`
  };
}

function getDirectionFromShift(shift: StructureShift): 'up' | 'down' | 'sideways' {
  if (shift.direction === 'break') {
    return shift.type === 'resistance' ? 'up' : 'down';
  }
  return shift.type === 'support' ? 'up' : 'down';
}

function calculateTargetPrice(
  currentPrice: number,
  direction: 'up' | 'down' | 'sideways',
  moveSize: number
): number {
  switch (direction) {
    case 'up':
      return currentPrice * (1 + moveSize);
    case 'down':
      return currentPrice * (1 - moveSize);
    default:
      return currentPrice;
  }
}