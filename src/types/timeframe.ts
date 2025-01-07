export interface TimeframeSignal {
  type: 'bullish' | 'bearish' | 'neutral';
  message: string;
}

export interface TimeframeData {
  change: number;
  volume: number;
  trades: number;
  signals: TimeframeSignal[];
}

export interface TimeframeAnalysis {
  m1: TimeframeData;
  m15: TimeframeData;
  m30: TimeframeData;
  h1: TimeframeData;
  h4: TimeframeData;
  h24: TimeframeData;
}

export interface TimeBasedSentiment {
  emotion: string;
  confidence: number;
  timeframe: string;
}

export interface TimeSentimentAnalysis {
  '1m': TimeBasedSentiment;
  '15m': TimeBasedSentiment;
  '30m': TimeBasedSentiment;
  '1h': TimeBasedSentiment;
  '4h': TimeBasedSentiment;
  '24h': TimeBasedSentiment;
}