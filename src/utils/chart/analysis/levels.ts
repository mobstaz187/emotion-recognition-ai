import { Level } from '../../../types/chart';

interface PriceLevel {
  price: number;
  strength: number;
  touches: number;
}

export function analyzeLevels(levels: PriceLevel[]): Level[] {
  return levels.map(level => ({
    type: level.strength > 0.5 ? 'resistance' : 'support',
    price: level.price,
    strength: level.strength
  }));
}