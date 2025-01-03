export interface TokenMetrics {
  price: number;
  marketCap: number;
  volume24h: number;
  priceChange24h: number;
  holders: number;
  liquidity: number;
  volatility: number;
}

export interface TechnicalIndicators {
  rsi: number;
  macd: {
    value: number;
    signal: number;
    histogram: number;
  };
  bollingerBands: {
    upper: number;
    middle: number;
    lower: number;
  };
  ema: {
    short: number;
    medium: number;
    long: number;
  };
}

export interface TokenData extends TokenMetrics {
  name: string;
  symbol: string;
  twitter?: string;
  website?: string;
  technicalIndicators: TechnicalIndicators;
  sentiment: {
    overall: number;
    technical: number;
    fundamental: number;
  };
}