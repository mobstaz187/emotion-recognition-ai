// Basic geometry types
export interface Point {
  x: number;
  y: number;
}

// Chart analysis types
export interface Level {
  type: 'support' | 'resistance';
  price: number;
  strength: number;
}

export interface ColorThresholds {
  red: number;
  green: number;
}

export interface ChartPattern {
  type: string;
  name: string;
  description: string;
  reliability: number;
  points: Point[];
  confidence: number;
}

export interface Candle {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  timestamp: number;
  x: number;
  isBullish: boolean;
}

export interface ChartAnalysisResult {
  levels: Level[];
  patterns: ChartPattern[];
  prediction: {
    direction: 'up' | 'down' | 'sideways';
    confidence: number;
  };
  sentiment: string;
  signals: Array<{
    type: 'bullish' | 'bearish' | 'neutral';
    message: string;
  }>;
}

export interface CandlePattern {
  type: string;
  name: string;
  description: string;
  reliability: number;
}