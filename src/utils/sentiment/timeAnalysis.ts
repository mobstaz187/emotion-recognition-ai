import { TokenData } from '../../types/token';
import { TimeSentimentAnalysis, TimeBasedSentiment } from '../../types/timeframe';

// Technical indicator weights for different timeframes
const TECHNICAL_WEIGHTS = {
  rsi: {
    '1m': 0.2,
    '15m': 0.25,
    '30m': 0.3,
    '1h': 0.35,
    '4h': 0.4,
    '24h': 0.45
  },
  macd: {
    '1m': 0.3,
    '15m': 0.35,
    '30m': 0.4,
    '1h': 0.45,
    '4h': 0.5,
    '24h': 0.55
  },
  bollinger: {
    '1m': 0.5,
    '15m': 0.4,
    '30m': 0.3,
    '1h': 0.2,
    '4h': 0.1,
    '24h': 0.0
  }
};

// Market metrics weights adjusted for micro-caps
const MARKET_WEIGHTS = {
  marketCap: 0.2,
  liquidity: 0.4,
  volatility: 0.4
};

function getTimeframeMultiplier(timeframe: string): number {
  switch (timeframe) {
    case '1m': return 1;
    case '15m': return 15;
    case '30m': return 30;
    case '1h': return 60;
    case '4h': return 240;
    case '24h': return 1440;
    default: return 1;
  }
}

function analyzeSingleTimeframe(
  data: TokenData, 
  timeframe: string,
  previousTimeframe?: string
): TimeBasedSentiment {
  const technicalScore = analyzeTechnicalIndicators(data, timeframe);
  const marketScore = analyzeMarketMetrics(data);
  
  // Calculate price change impact
  let priceChangeImpact = 0;
  if (previousTimeframe) {
    const currentMultiplier = getTimeframeMultiplier(timeframe);
    const previousMultiplier = getTimeframeMultiplier(previousTimeframe);
    const scaledChange = (data.priceChange24h / 1440) * (currentMultiplier - previousMultiplier);
    priceChangeImpact = scaledChange * 2; // Double the impact for more emotional response
  }
  
  // Calculate weighted score with price change impact
  const totalScore = ((technicalScore + marketScore) / 2) + priceChangeImpact;
  
  // Determine emotion and confidence based on score and price change
  let emotion: string;
  let confidence: number;

  if (totalScore >= 70) {
    
    emotion = priceChangeImpact <= 5 ? 'happy' : 'surprised';
    confidence = 0.8;
  } else if (totalScore >= 55) {
    emotion = priceChangeImpact >= 10 ? 'surprised' : 'happy';
    confidence = 0.9;
  } else if (totalScore >= 35) {
    emotion = priceChangeImpact <= -5 ? 'fearful' : 'sad';
    confidence = 0.8;
  } else if (totalScore >= 25) {
    emotion = Math.abs(priceChangeImpact) < 3 ? 'neutral' : (priceChangeImpact >= 0 ? 'happy' : 'sad');
    confidence = 0.7;
  } else if (totalScore >= 15) {
    emotion = priceChangeImpact <= -30 ? 'angry' : 'fearful';
    confidence = 0.85;
  } else if (totalScore >= 12) {
        emotion = 'disgusted';
    confidence = 0.95;
  } else {
    emotion = priceChangeImpact <= 0 ? 'disgusted' : 'angry';
    confidence = 0.9;

  }

  return {
    emotion,
    confidence,
    timeframe
  };
}

function analyzeTechnicalIndicators(data: TokenData, timeframe: string): number {
  const { rsi, macd, bollingerBands } = data.technicalIndicators;

  // RSI Analysis
  const rsiScore = rsi > 70 ? 30 : rsi < 30 ? 70 : 50;
  
  // MACD Analysis
  const macdScore = macd.histogram > 0 ? 
    70 + (macd.histogram * 10) : 
    30 + (macd.histogram * 10);

  // Bollinger Bands Analysis
  const bbScore = (data.price - bollingerBands.lower) / 
    (bollingerBands.upper - bollingerBands.lower) * 100;

  return (
    rsiScore * TECHNICAL_WEIGHTS.rsi[timeframe] +
    macdScore * TECHNICAL_WEIGHTS.macd[timeframe] +
    bbScore * TECHNICAL_WEIGHTS.bollinger[timeframe]
  );
}

function analyzeMarketMetrics(data: TokenData): number {
  // Market cap score (adjusted for micro-caps)
  const mcapScore = data.marketCap < 1000000 ? 100 : 
                    data.marketCap < 10000000 ? 80 :
                    data.marketCap < 100000000 ? 60 : 40;

  // Liquidity score
  const liquidityScore = (data.liquidity / data.marketCap) * 100;

  // Volatility score (higher volatility = higher score for micro-caps)
  const volatilityScore = Math.min(data.volatility * 200, 100);

  return (
    mcapScore * MARKET_WEIGHTS.marketCap +
    liquidityScore * MARKET_WEIGHTS.liquidity +
    volatilityScore * MARKET_WEIGHTS.volatility
  );
}

export function analyzeAllTimeframes(data: TokenData): TimeSentimentAnalysis {
  const timeframes = ['1m', '15m', '30m', '1h', '4h', '24h'];
  const analysis = {} as TimeSentimentAnalysis;

  timeframes.forEach((timeframe, index) => {
    const previousTimeframe = index > 0 ? timeframes[index - 1] : undefined;
    analysis[timeframe] = analyzeSingleTimeframe(data, timeframe, previousTimeframe);
  });

  return analysis;
}