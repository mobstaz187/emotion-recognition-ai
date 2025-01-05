import { DETECTION_CONFIG } from './config';

export interface PriceCluster {
  price: number;
  density: number;
  touches: number;
}

export function findPriceClusters(
  points: number[],
  height: number,
  clusterSize = DETECTION_CONFIG.CLUSTER_SIZE
): PriceCluster[] {
  const clusters: Map<number, { count: number, touches: number }> = new Map();
  
  points.forEach(price => {
    const clusterPrice = Math.round(price / clusterSize) * clusterSize;
    const existing = clusters.get(clusterPrice) || { count: 0, touches: 0 };
    
    existing.count++;
    if (!clusters.has(clusterPrice - 1) && !clusters.has(clusterPrice + 1)) {
      existing.touches++;
    }
    
    clusters.set(clusterPrice, existing);
  });

  return Array.from(clusters.entries())
    .map(([price, data]) => ({
      price: (price / height) * 100,
      density: data.count,
      touches: data.touches
    }))
    .filter(cluster => cluster.touches >= DETECTION_CONFIG.MIN_TOUCHES);
}