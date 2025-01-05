```typescript
import { useState, useEffect } from 'react';
import { TimeframeAnalysis } from '../types/timeframe';

const createEmptyTimeframe = () => ({
  change: 0,
  volume: 0,
  trades: 0,
  signals: []
});

export function useTimeframeAnalysis(address: string) {
  const [analysis, setAnalysis] = useState<TimeframeAnalysis>({
    h1: createEmptyTimeframe(),
    m30: createEmptyTimeframe(),
    m15: createEmptyTimeframe()
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!address) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch and process data
        const response = await fetch(`/api/timeframe/${address}`);
        const data = await response.json();
        setAnalysis(data);
      } catch (error) {
        console.error('Error fetching timeframe data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [address]);

  return { analysis, isLoading };
}
```