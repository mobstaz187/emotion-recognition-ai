export interface Point {
  x: number;
  y: number;
}

export interface Candle {
  x: number;
  open: number;
  close: number;
  high: number;
  low: number;
  isBullish: boolean;
}

export interface ChartPattern {
  name: string;
  type: 'bullish' | 'bearish';
  description: string;
  reliability: number;
}

export interface PriceLevel {
  price: number;
  strength: number;
  type: 'support' | 'resistance';
}

export interface ChartAnalysisResult {
  sentiment: 'bullish' | 'bearish';
  confidence: number;
  signals: Array<{
    type: 'bullish' | 'bearish';
    message: string;
  }>;
  pattern: ChartPattern;
  imageUrl: string;
}

export interface PricePrediction {
  direction: 'up' | 'down' | 'sideways';
  targetPrice: number;
  confidence: number;
  reason: string;
}