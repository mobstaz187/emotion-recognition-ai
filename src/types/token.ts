export interface TokenData {
  name: string;
  symbol: string;
  marketCap: number;
  price: number;
  volume24h: number;
  priceChange24h: number;
  twitter?: string;
  telegram?: string;
  website?: string;
}