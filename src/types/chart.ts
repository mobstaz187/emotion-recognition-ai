// Update ChartPattern interface to include additional properties
export interface ChartPattern {
  type: string;
  name: string;
  description: string;
  reliability: number;
  points: Point[];
  confidence: number;
}

// Update PriceLevel interface to include type
export interface PriceLevel {
  type: 'support' | 'resistance';
  price: number;
  strength: number;
  touches: number;
}

// Update Candle interface with additional properties
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

// Update ChartAnalysisResult interface
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
  imageUrl?: string;
}