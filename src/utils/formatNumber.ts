export function formatNumber(num: number): string {
  if (num === 0) return '0.000';
  
  // Format market cap and volume with abbreviations
  if (num >= 1e9) {
    return `${(num / 1e9).toFixed(3)}B`;
  }
  if (num >= 1e6) {
    return `${(num / 1e6).toFixed(3)}M`;
  }
  if (num >= 1e3) {
    return `${(num / 1e3).toFixed(3)}K`;
  }
  
  // For all other numbers, show 3 decimal places
  return num.toFixed(3);
}