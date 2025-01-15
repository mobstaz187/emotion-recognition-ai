import { Level } from '../../../types/chart';
import { PricePoint } from './priceMapping';
import { calculateThresholds } from './thresholds';
import { mergeSimilarLevels } from './merger';
import { findPriceClusters } from './clustering';
import { collectPricePoints } from './priceCollection';
import { DETECTION_CONFIG } from './config';

export function detectLevels(
  points: PricePoint[],
  width: number,
  height: number,
  colorMatrix: any[][]
): Level[] {
  const levels: Level[] = [];
  const thresholds = calculateThresholds(width);

  // Enhanced support detection with bounce, stability, and wick analysis
  const pricePoints = collectPricePoints(colorMatrix, height);
  const clusters = findPriceClusters(pricePoints, height);
  
  clusters.forEach(cluster => {
    // Calculate base strength from density and touches
    const baseStrength = (cluster.density * cluster.touches * DETECTION_CONFIG.SUPPORT_SENSITIVITY_MULTIPLIER) / 
      (width * height);
    
    // Calculate bounce strength
    const bounceStrength = (cluster.bounces / cluster.touches) * DETECTION_CONFIG.BOUNCE_WEIGHT;
    
    // Calculate stability strength
    const stabilityStrength = (cluster.stability / cluster.touches) * DETECTION_CONFIG.STABILITY_WEIGHT;
    
    // Calculate wick strength - longer wicks indicate stronger levels
    const wickStrength = (cluster.wickLength / width) * 0.2;
    
    // Combine all factors for final strength
    const strength = Math.min(
      0.95,
      baseStrength + bounceStrength + stabilityStrength + wickStrength + 0.3
    );

    levels.push({
      type: 'support',
      price: cluster.price,
      strength: strength
    });
  });

  // Enhanced resistance detection with wick consideration
  points.forEach(point => {
    if (point.red > thresholds.resistance) {
      const wickFactor = point.wickLength ? (point.wickLength / width) * 0.2 : 0;
      const strength = Math.min(
        0.95,
        (point.red / (width * height)) + wickFactor + 0.3
      );

      levels.push({
        type: 'resistance',
        price: point.price,
        strength: strength
      });
    }
  });

  // Merge and filter levels
  const mergedLevels = mergeSimilarLevels(levels);
  
  // Sort by strength and limit number of levels
  return mergedLevels
    .sort((a, b) => b.strength - a.strength)
    .slice(0, 6); // Limit to top 6 strongest levels
}