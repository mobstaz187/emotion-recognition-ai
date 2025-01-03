import { Candle } from '../../../types/chart';

export function calculateVolatility(candles: Candle[]): number {
  if (candles.length < 2) return 0;

  // Calculate daily returns
  const returns = [];
  for (let i = 1; i < candles.length; i++) {
    const prevClose = candles[i - 1].close;
    const currentClose = candles[i].close;
    returns.push((currentClose - prevClose) / prevClose);
  }

  // Calculate standard deviation of returns
  const mean = returns.reduce((sum, r) => sum + r, 0) / returns.length;
  const squaredDiffs = returns.map(r => Math.pow(r - mean, 2));
  const variance = squaredDiffs.reduce((sum, d) => sum + d, 0) / returns.length;
  
  return Math.sqrt(variance);
}