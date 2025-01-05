import { Candle } from '../../../types/chart';

export function detectCandles(data: number[][]): Candle[] {
  return data.map((values, index) => ({
    open: values[0],
    high: values[1],
    low: values[2],
    close: values[3],
    volume: values[4],
    timestamp: Date.now() - (data.length - index) * 60000,
    x: index,
    isBullish: values[3] > values[0]
  }));
}