import { ColorCounts } from './colorDetection';

export function collectPricePoints(
  colorMatrix: ColorCounts[][],
  height: number
): number[] {
  const prices: number[] = [];
  
  for (let y = 0; y < height; y++) {
    let hasCandle = false;
    let greenCount = 0;
    
    for (let x = 0; x < colorMatrix[y].length; x++) {
      if (colorMatrix[y][x].green > 0) {
        greenCount++;
      }
      if (colorMatrix[y][x].red > 0 || colorMatrix[y][x].green > 0) {
        hasCandle = true;
      }
    }
    
    // Add price point if there's significant green presence
    if (hasCandle && greenCount > 0) {
      prices.push(y);
    }
  }
  
  return prices;
}