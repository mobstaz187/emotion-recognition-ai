import { Level, ColorThresholds } from '../../types/chart';
import { detectColors } from './detection/colorDetection';
import { mapPriceLevels } from './detection/priceMapping';
import { detectLevels } from './detection/levelDetection';
import { ColorCounts } from './detection/colorDetection';

export async function analyzeChart(
  imageUrl: string, 
  thresholds: ColorThresholds
): Promise<Level[]> {
  // Check if URL is an iframe source
  if (imageUrl.includes('birdeye.so')) {
    // For iframes, return some default levels for visualization
    return [
      { type: 'support', price: 30, strength: 0.7 },
      { type: 'support', price: 20, strength: 0.8 },
      { type: 'resistance', price: 70, strength: 0.6 },
      { type: 'resistance', price: 80, strength: 0.7 }
    ];
  }

  // Regular image analysis
  const img = new Image();
  img.src = imageUrl;
  
  return new Promise((resolve) => {
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return resolve([]);

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const { width, height, data } = imageData;

      // Create color detection matrix
      const colorMatrix: ColorCounts[][] = Array(height).fill(0).map(() => 
        Array(width).fill(0).map(() => ({ red: 0, green: 0 }))
      );
      
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const idx = (y * width + x) * 4;
          colorMatrix[y][x] = detectColors(data, idx, thresholds);
        }
      }

      // Map price levels
      const pricePoints = mapPriceLevels(width, height, colorMatrix);

      // Detect levels
      const levels = detectLevels(pricePoints, width, height, colorMatrix);
      
      resolve(levels);
    };
  });
}