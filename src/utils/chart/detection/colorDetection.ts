import { ColorThresholds } from '../../../types/chart';

export interface ColorCounts {
  red: number;
  green: number;
  wick: number;  // Add wick detection
}

export function detectColors(
  data: Uint8ClampedArray, 
  idx: number,
  thresholds: ColorThresholds
): ColorCounts {
  const r = data[idx];
  const g = data[idx + 1];
  const b = data[idx + 2];
  const brightness = (r + g + b) / 3;

  return {
    red: isRedCandle(r, g, b, brightness, thresholds.red) ? 1 : 0,
    green: isGreenCandle(r, g, b, brightness, thresholds.green) ? 1 : 0,
    wick: isWick(r, g, b, brightness) ? 1 : 0  // Add wick detection
  };
}

function isRedCandle(
  r: number, 
  g: number, 
  b: number, 
  brightness: number,
  threshold: number
): boolean {
  const redDominance = r / (g + b + 1);
  return (
    (brightness < 100 && redDominance > 1.3) ||
    (brightness >= 100 && r > threshold && g < threshold - 15 && b < threshold - 15)
  );
}

function isGreenCandle(
  r: number, 
  g: number, 
  b: number, 
  brightness: number,
  threshold: number
): boolean {
  const greenDominance = g / (r + b + 1);
  return (
    (brightness < 100 && greenDominance > 1.3) ||
    (brightness >= 100 && g > threshold && r < threshold - 15 && b < threshold - 15)
  );
}

// Add wick detection function
function isWick(
  r: number,
  g: number,
  b: number,
  brightness: number
): boolean {
  // Detect thin dark lines that could be wicks
  const isDark = brightness < 80;
  const isBalanced = Math.abs(r - g) < 30 && Math.abs(r - b) < 30 && Math.abs(g - b) < 30;
  return isDark && isBalanced;
}