import { DETECTION_CONFIG } from './config';

export interface PriceCluster {
  price: number;
  density: number;
  touches: number;
  bounces: number;
  stability: number;
  wickLength: number;
}

export function findPriceClusters(
  points: { price: number; bounceCount: number; stabilityCount: number; wickLength: number }[],
  height: number,
  clusterSize = DETECTION_CONFIG.CLUSTER_SIZE
): PriceCluster[] {
  const clusters: Map<number, { 
    count: number; 
    touches: number; 
    bounces: number;
    stability: number;
    wickLength: number;
  }> = new Map();
  
  points.forEach(point => {
    const clusterPrice = Math.round(point.price / clusterSize) * clusterSize;
    const existing = clusters.get(clusterPrice) || { 
      count: 0, 
      touches: 0, 
      bounces: 0,
      stability: 0,
      wickLength: 0
    };
    
    existing.count++;
    if (!clusters.has(clusterPrice - 1) && !clusters.has(clusterPrice + 1)) {
      existing.touches++;
    }
    existing.bounces += point.bounceCount;
    existing.stability += point.stabilityCount;
    existing.wickLength += point.wickLength;
    
    clusters.set(clusterPrice, existing);
  });

  return Array.from(clusters.entries())
    .map(([price, data]) => ({
      price: (price / height) * 100,
      density: data.count,
      touches: data.touches,
      bounces: data.bounces,
      stability: data.stability,
      wickLength: data.wickLength
    }))
    .filter(cluster => 
      cluster.touches >= DETECTION_CONFIG.MIN_TOUCHES ||
      cluster.bounces >= DETECTION_CONFIG.MIN_BOUNCES ||
      cluster.stability >= DETECTION_CONFIG.MIN_STABILITY
    );
}