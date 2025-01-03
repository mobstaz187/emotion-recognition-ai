// Add CandlePattern interface
export interface CandlePattern {
  type: 'bullish' | 'bearish' | 'neutral';
  name: string;
  startIndex: number;
  endIndex: number;
  reliability: number;
}