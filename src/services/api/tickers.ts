import { Ticker } from '../../types/ticker';

export async function fetchTwitterTickers(): Promise<Ticker[]> {
  try {
    // In a real app, this would be an API call with a time window parameter
    // For demo, we'll simulate API data for the last 2 hours
    const response = await fetch('https://api.example.com/tickers?window=2h');
    if (!response.ok) {
      throw new Error('Failed to fetch tickers');
    }
    return await response.json();
  } catch (error) {
    // Fallback to mock data for demo
    return generateMockTickers();
  }
}

function generateMockTickers(): Ticker[] {
  const baseSymbols = ['DOGE', 'SHIB', 'PEPE', 'FLOKI', 'WOJAK', 'BONK', 'ELON', 'SAMO'];
  
  return baseSymbols
    .map(symbol => ({
      symbol,
      mentions: Math.floor(Math.random() * 15000) + 1000,
      change: Number((Math.random() * 20 - 10).toFixed(1))
    }))
    .sort((a, b) => b.mentions - a.mentions);
}