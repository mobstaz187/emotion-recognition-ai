export interface Candle {
  x: number;
  open: number;
  close: number;
  high: number;
  low: number;
  isBullish: boolean;
}

export interface CandlePattern {
  type: 'bullish' | 'bearish' | 'neutral';
  name: string;
  startIndex: number;
  endIndex: number;
  reliability: number;
}

// ... rest of existing types ...