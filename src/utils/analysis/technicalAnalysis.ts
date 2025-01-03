import { TechnicalIndicators } from '../../types/token';

export function calculateRSI(prices: number[], period = 14): number {
  if (prices.length < period + 1) return 50;

  let gains = 0;
  let losses = 0;

  for (let i = 1; i <= period; i++) {
    const difference = prices[i] - prices[i - 1];
    if (difference >= 0) {
      gains += difference;
    } else {
      losses -= difference;
    }
  }

  const avgGain = gains / period;
  const avgLoss = losses / period;
  const rs = avgGain / avgLoss;
  return 100 - (100 / (1 + rs));
}

export function calculateMACD(prices: number[]): {
  value: number;
  signal: number;
  histogram: number;
} {
  const shortEMA = calculateEMA(prices, 12);
  const longEMA = calculateEMA(prices, 26);
  const macdValue = shortEMA - longEMA;
  const signalLine = calculateEMA([macdValue], 9);
  
  return {
    value: macdValue,
    signal: signalLine,
    histogram: macdValue - signalLine
  };
}

export function calculateEMA(prices: number[], period: number): number {
  const multiplier = 2 / (period + 1);
  let ema = prices[0];

  for (let i = 1; i < prices.length; i++) {
    ema = (prices[i] - ema) * multiplier + ema;
  }

  return ema;
}

export function calculateBollingerBands(prices: number[], period = 20): {
  upper: number;
  middle: number;
  lower: number;
} {
  const sma = prices.slice(-period).reduce((a, b) => a + b) / period;
  const standardDeviation = Math.sqrt(
    prices.slice(-period).reduce((sum, price) => sum + Math.pow(price - sma, 2), 0) / period
  );

  return {
    upper: sma + standardDeviation * 2,
    middle: sma,
    lower: sma - standardDeviation * 2
  };
}