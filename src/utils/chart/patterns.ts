import type { ChartPattern } from '../../types/chart';

export const CHART_PATTERNS: ChartPattern[] = [
  {
    name: 'Double Bottom',
    type: 'bullish',
    description: 'A bullish reversal pattern showing price bouncing off support twice.',
    reliability: 0.85
  },
  {
    name: 'Head and Shoulders',
    type: 'bearish',
    description: 'A bearish reversal pattern with three peaks, the middle being highest.',
    reliability: 0.78
  },
  {
    name: 'Ascending Triangle',
    type: 'bullish',
    description: 'A continuation pattern with horizontal resistance and rising support.',
    reliability: 0.82
  },
  {
    name: 'Cup and Handle',
    type: 'bullish',
    description: 'A bullish continuation pattern resembling a cup with a handle.',
    reliability: 0.75
  },
  {
    name: 'Descending Triangle',
    type: 'bearish',
    description: 'A bearish continuation pattern with horizontal support and falling resistance.',
    reliability: 0.80
  },
  {
    name: 'Bull Flag',
    type: 'bullish',
    description: 'A bullish continuation pattern showing a pause in upward momentum.',
    reliability: 0.77
  },
  {
    name: 'Bear Flag',
    type: 'bearish',
    description: 'A bearish continuation pattern showing a pause in downward momentum.',
    reliability: 0.77
  },
  {
    name: 'Rising Wedge',
    type: 'bearish',
    description: 'A bearish reversal pattern with converging upward trendlines.',
    reliability: 0.75
  },
  {
    name: 'Falling Wedge',
    type: 'bullish',
    description: 'A bullish reversal pattern with converging downward trendlines.',
    reliability: 0.75
  },
  {
    name: 'Triple Top',
    type: 'bearish',
    description: 'A bearish reversal pattern showing three equal highs.',
    reliability: 0.83
  },
  {
    name: 'Triple Bottom',
    type: 'bullish',
    description: 'A bullish reversal pattern showing three equal lows.',
    reliability: 0.83
  },
  {
    name: 'Inverse Head and Shoulders',
    type: 'bullish',
    description: 'A bullish reversal pattern with three troughs, the middle being lowest.',
    reliability: 0.78
  }
];