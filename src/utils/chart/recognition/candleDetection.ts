import { Candle } from '../../../types/chart';

export function detectCandles(imageData: ImageData): Candle[] {
  const candles: Candle[] = [];
  const { data, width, height } = imageData;

  // Scan image data for colored candles
  for (let x = 0; x < width; x++) {
    let inCandle = false;
    let candleStart = 0;
    let wickHigh = height;
    let wickLow = 0;
    let isGreenCandle = false;

    for (let y = 0; y < height; y++) {
      const idx = (y * width + x) * 4;
      const [r, g, b] = [data[idx], data[idx + 1], data[idx + 2]];
      
      // Check for green or red candle colors
      const isGreen = g > 150 && r < 100 && b < 100;
      const isRed = r > 150 && g < 100 && b < 100;
      const isColoredPixel = isGreen || isRed;

      if (isColoredPixel && !inCandle) {
        inCandle = true;
        candleStart = y;
        wickHigh = Math.min(wickHigh, y);
        isGreenCandle = isGreen;
      } else if (!isColoredPixel && inCandle) {
        inCandle = false;
        wickLow = Math.max(wickLow, y);
        
        // Add detected candle
        candles.push({
          x,
          open: candleStart,
          close: y,
          high: wickHigh,
          low: wickLow,
          isBullish: isGreenCandle
        });
      }
    }
  }

  return filterValidCandles(candles);
}

function filterValidCandles(candles: Candle[]): Candle[] {
  if (candles.length === 0) return [];
  
  const avgHeight = candles.reduce((sum, c) => sum + Math.abs(c.close - c.open), 0) / candles.length;
  
  // Group consecutive candles that are likely part of the same candle
  const mergedCandles: Candle[] = [];
  let currentCandle = candles[0];

  for (let i = 1; i < candles.length; i++) {
    const nextCandle = candles[i];
    
    // If candles are adjacent and same color, merge them
    if (nextCandle.x === currentCandle.x + 1 && 
        nextCandle.isBullish === currentCandle.isBullish) {
      currentCandle = {
        ...currentCandle,
        x: Math.floor((currentCandle.x + nextCandle.x) / 2),
        high: Math.min(currentCandle.high, nextCandle.high),
        low: Math.max(currentCandle.low, nextCandle.low)
      };
    } else {
      mergedCandles.push(currentCandle);
      currentCandle = nextCandle;
    }
  }
  mergedCandles.push(currentCandle);

  // Filter out invalid candles
  return mergedCandles.filter(candle => {
    const bodyHeight = Math.abs(candle.close - candle.open);
    const wickLength = candle.low - candle.high;
    
    return bodyHeight > avgHeight * 0.2 && // Minimum body size
           wickLength < avgHeight * 3 && // Maximum wick length
           candle.high < candle.low && // Valid wick direction
           bodyHeight > 2; // Minimum pixel height to avoid noise
  });
}