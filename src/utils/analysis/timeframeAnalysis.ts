```typescript
import { TimeframeData } from '../../types/timeframe';

interface TimeframeAnalysisResult {
  sentiment: 'bullish' | 'bearish' | 'neutral';
  signals: Array<{
    type: 'bullish' | 'bearish' | 'neutral';
    message: string;
  }>;
}

export function analyzeTimeframe(data: TimeframeData): TimeframeAnalysisResult {
  const signals: Array<{type: 'bullish' | 'bearish' | 'neutral', message: string}> = [];
  let sentiment: 'bullish' | 'bearish' | 'neutral' = 'neutral';

  // Analyze price change
  if (data.change > 0) {
    signals.push({
      type: 'bullish',
      message: `Price increased by ${data.change.toFixed(2)}%`
    });
    sentiment = 'bullish';
  } else if (data.change < 0) {
    signals.push({
      type: 'bearish',
      message: `Price decreased by ${Math.abs(data.change).toFixed(2)}%`
    });
    sentiment = 'bearish';
  }

  return { sentiment, signals };
}
```