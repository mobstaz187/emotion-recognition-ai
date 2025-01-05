export interface Level {
  type: 'support' | 'resistance';
  price: number;
  strength: number;
}

export interface ColorThresholds {
  red: number;
  green: number;
}

export interface Candle {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  timestamp: number;
}

export interface PriceLevel {
  price: number;
  strength: number;
  touches: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface ChartPattern {
  type: string;
  points: Point[];
  confidence: number;
}

export interface CandlePattern {
  type: string;
  candles: Candle[];
  significance: number;
}

export interface ChartAnalysisResult {
  levels: Level[];
  patterns: ChartPattern[];
  prediction: {
    direction: 'up' | 'down' | 'sideways';
    confidence: number;
  };
}