import { useState, useEffect, useCallback } from 'react';
import { Ticker } from '../types/ticker';
import { fetchTwitterTickers } from '../services/api/tickers';

export function useTwitterTickers() {
  const [tickers, setTickers] = useState<Ticker[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchTickers = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await fetchTwitterTickers();
      setTickers(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to fetch tickers:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refresh = useCallback(() => {
    fetchTickers();
  }, [fetchTickers]);

  useEffect(() => {
    fetchTickers();
    
    // Auto-refresh every 2 minutes
    const interval = setInterval(fetchTickers, 120000);
    return () => clearInterval(interval);
  }, [fetchTickers]);

  return { 
    tickers, 
    isLoading, 
    refresh,
    lastUpdated 
  };
}