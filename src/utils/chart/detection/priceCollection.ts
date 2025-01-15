import { ColorCounts } from './colorDetection';

interface PricePoint {
  price: number;
  bounceCount: number;
  stabilityCount: number;
  wickLength: number;  // Add wick length tracking
}

export function collectPricePoints(
  colorMatrix: ColorCounts[][],
  height: number
): PricePoint[] {
  const prices: PricePoint[] = [];
  const bounceThreshold = 3;
  const stabilityThreshold = 5;
  
  for (let y = 0; y < height; y++) {
    let hasCandle = false;
    let greenCount = 0;
    let bounceCount = 0;
    let consecutiveGreen = 0;
    let stabilityCount = 0;
    let previousCandles = 0;
    let wickLength = 0;  // Track wick length
    
    for (let x = 0; x < colorMatrix[y].length; x++) {
      const currentCandles = colorMatrix[y][x].green + colorMatrix[y][x].red;
      
      // Track wick length
      if (colorMatrix[y][x].wick > 0) {
        wickLength++;
      }
      
      // Check for price stability
      if (Math.abs(currentCandles - previousCandles) <= 1) {
        stabilityCount++;
      } else {
        stabilityCount = 0;
      }
      
      if (colorMatrix[y][x].green > 0) {
        greenCount++;
        consecutiveGreen++;
        
        if (consecutiveGreen >= bounceThreshold) {
          bounceCount++;
          consecutiveGreen = 0;
        }
      } else {
        consecutiveGreen = 0;
      }
      
      if (currentCandles > 0) {
        hasCandle = true;
        previousCandles = currentCandles;
      }
    }
    
    if (hasCandle && (greenCount > 0 || bounceCount > 0 || stabilityCount >= stabilityThreshold)) {
      prices.push({
        price: y,
        bounceCount: bounceCount,
        stabilityCount: stabilityCount,
        wickLength: wickLength  // Include wick length in price point data
      });
    }
  }
  
  return prices;
}