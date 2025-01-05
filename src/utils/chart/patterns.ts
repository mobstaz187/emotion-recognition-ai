import { ChartPattern } from '../../types/chart';

export const patterns: ChartPattern[] = [
  {
    type: 'bullish',
    name: 'Double Bottom',
    description: 'A bullish reversal pattern',
    reliability: 0.75,
    points: [],
    confidence: 0.8
  },
  {
    type: 'bearish',
    name: 'Double Top',
    description: 'A bearish reversal pattern',
    reliability: 0.75,
    points: [],
    confidence: 0.8
  }
  // Add other patterns with required properties
];