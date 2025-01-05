export interface TimeframeData {
  change: number;
  volume: number;
  trades: number;
  signals: Array<{
    type: 'bullish' | 'bearish' | 'neutral';
    message: string;
  }>;
}

export interface TimeframeAnalysis {
  h1: TimeframeData;
  m30: TimeframeData;
  m15: TimeframeData;
}