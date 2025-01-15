import { Level, ColorThresholds } from '../../types/chart';
import { detectColors } from './detection/colorDetection';
import { mapPriceLevels } from './detection/priceMapping';
import { detectLevels } from './detection/levelDetection';
import { ColorCounts } from './detection/colorDetection';

export async function analyzeChart(
  imageUrl: string, 
  thresholds: ColorThresholds
): Promise<Level[]> {
  // For iframe analysis, return simulated levels based on time
  if (imageUrl.includes('birdeye.so')) {
    const now = Date.now();
    const phase = (now % 10000) / 10000; // 10 second cycle
    
    // Generate dynamic levels based on time
    return [
      { 
        type: 'support', 
        price: 30 + Math.sin(phase * Math.PI * 2) * 5,
        strength: 0.7 + Math.sin(phase * Math.PI * 4) * 0.1
      },
      { 
        type: 'support', 
        price: 20 + Math.cos(phase * Math.PI * 2) * 3,
        strength: 0.8 + Math.cos(phase * Math.PI * 4) * 0.1
      },
      { 
        type: 'resistance', 
        price: 70 + Math.sin(phase * Math.PI * 2) * 4,
        strength: 0.6 + Math.sin(phase * Math.PI * 4) * 0.1
      },
      { 
        type: 'resistance', 
        price: 80 + Math.cos(phase * Math.PI * 2) * 6,
        strength: 0.7 + Math.cos(phase * Math.PI * 4) * 0.1
      }
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
        Array(width).fill(0).map(() => ({ red: 0, green: 0, wick: 0 }))
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