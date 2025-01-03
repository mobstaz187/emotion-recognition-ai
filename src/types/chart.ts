// Basic types
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

export interface PriceLevel {
  price: number;
  strength: number;
  type: 'support' | 'resistance';
}

// Pattern types
export interface ChartPattern {
  name: string;
  type: 'bullish' | 'bearish' | 'neutral';
  description: string;
  reliability: number;
}

export interface CandlePattern {
  type: 'bullish' | 'bearish' | 'neutral';
  name: string;
  startIndex: number;
  endIndex: number;
  reliability: number;
}

// Analysis types
export interface ChartSignal {
  type: 'bullish' | 'bearish' | 'neutral';
  message: string;
}

export interface ChartAnalysisResult {
  sentiment: 'bullish' | 'bearish' | 'neutral';
  confidence: number;
  signals: ChartSignal[];
  pattern: ChartPattern;
  imageUrl: string;
}

// Prediction types
export interface PricePrediction {
  direction: 'up' | 'down' | 'sideways';
  targetPrice: number;
  confidence: number;
  reason: string;
}