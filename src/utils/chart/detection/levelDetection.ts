import { Level } from '../../../types/chart';
import { PricePoint } from './priceMapping';
import { calculateThresholds } from './thresholds';
import { mergeSimilarLevels } from './merger';
import { findPriceClusters } from './clustering';
import { collectPricePoints } from './priceCollection';

export function detectLevels(
  points: PricePoint[],
  width: number,
  height: number,
  colorMatrix: any[][]
): Level[] {
  const levels: Level[] = [];
  const thresholds = calculateThresholds(width);

  // Detect resistance levels
  points.forEach(point => {
    if (point.red > thresholds.resistance) {
      levels.push({
        type: 'resistance',
        price: point.price,
        strength: point.red / (width * height)
      });
    }
  });

  // Detect support levels using price clustering
  const pricePoints = collectPricePoints(colorMatrix, height);
  const clusters = findPriceClusters(pricePoints, height);
  
  clusters.forEach(cluster => {
    levels.push({
      type: 'support',
      price: cluster.price,
      strength: (cluster.density * cluster.touches) / (width * height)
    });
  });

  return mergeSimilarLevels(levels);
}