// Add new types for time-based sentiment
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