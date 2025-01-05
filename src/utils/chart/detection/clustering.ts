// Handles price clustering analysis
export interface PriceCluster {
  price: number;
  density: number;
  touches: number;
}

export function findPriceClusters(
  points: number[],
  height: number,
  clusterSize: number = 5
): PriceCluster[] {
  const clusters: Map<number, { count: number, touches: number }> = new Map();
  
  // Group prices into clusters
  points.forEach(price => {
    const clusterPrice = Math.round(price / clusterSize) * clusterSize;
    const existing = clusters.get(clusterPrice) || { count: 0, touches: 0 };
    
    existing.count++;
    // Count as new touch if no nearby prices were recently processed
    if (!clusters.has(clusterPrice - 1) && !clusters.has(clusterPrice + 1)) {
      existing.touches++;
    }
    
    clusters.set(clusterPrice, existing);
  });

  return Array.from(clusters.entries())
    .map(([price, data]) => ({
      price: (price / height) * 100, // Convert to percentage
      density: data.count,
      touches: data.touches
    }))
    .filter(cluster => cluster.touches >= 2); // Require minimum touches
}