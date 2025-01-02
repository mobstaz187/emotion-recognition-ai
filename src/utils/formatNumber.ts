export function formatNumber(num: number): string {
  if (num === 0) return '0.00';
  
  // Format market cap and volume with abbreviations
  if (num >= 1e9) {
    return `${(num / 1e9).toFixed(2)}B`;
  }
  if (num >= 1e6) {
    return `${(num / 1e6).toFixed(2)}M`;
  }
  if (num >= 1e3) {
    return `${(num / 1e3).toFixed(2)}K`;
  }
  
  // For prices, show appropriate decimal places based on value
  if (num < 1) {
    // Count leading zeros after decimal point
    const match = num.toString().match(/\.0*/);
    const leadingZeros = match ? match[0].length - 1 : 0;
    // Show enough decimals to display first 4 significant digits
    return num.toFixed(Math.max(leadingZeros + 4, 8));
  }
  
  // For regular numbers
  return num.toFixed(2);
}