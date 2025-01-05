```typescript
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
  h1: TimeframeData;
  m30: TimeframeData;
  m15: TimeframeData;
}
```