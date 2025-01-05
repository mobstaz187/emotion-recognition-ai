```typescript
import { Candle } from '../../../types/chart';
import { PricePrediction } from './pricePredictor';

export function predictStructure(_candles: Candle[]): PricePrediction {
  return {
    direction: 'sideways',
    targetPrice: 0,
    confidence: 0,
    reason: ''
  };
}
```