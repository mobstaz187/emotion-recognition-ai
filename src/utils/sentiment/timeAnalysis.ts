import { TokenData } from '../../types/token';
import { TimeSentimentAnalysis, TimeBasedSentiment } from '../../types/timeframe';

type TimeframeKey = '1m' | '15m' | '30m' | '1h' | '4h' | '24h';

interface TechnicalWeights {
  rsi: Record<TimeframeKey, number>;
  macd: Record<TimeframeKey, number>;
  bollinger: Record<TimeframeKey, number>;
}

const TECHNICAL_WEIGHTS: TechnicalWeights = {
  rsi: {
    '1m': 0.2, '15m': 0.25, '30m': 0.3,
    '1h': 0.35, '4h': 0.4, '24h': 0.45
  },
  macd: {
    '1m': 0.3, '15m': 0.35, '30m': 0.4,
    '1h': 0.45, '4h': 0.5, '24h': 0.55
  },
  bollinger: {
    '1m': 0.5, '15m': 0.4, '30m': 0.3,
    '1h': 0.2, '4h': 0.1, '24h': 0.0
  }
};

const TIMEFRAME_MULTIPLIERS: Record<TimeframeKey, number> = {
  '1m': 0.2, '15m': 0.4, '30m': 0.6,
  '1h': 0.8, '4h': 0.9, '24h': 1.0
};

export function analyzeAllTimeframes(data: TokenData): TimeSentimentAnalysis {
  const timeframes: TimeframeKey[] = ['1m', '15m', '30m', '1h', '4h', '24h'];
  
  return timeframes.reduce((acc, timeframe) => ({
    ...acc,
    [timeframe]: analyzeTimeframeSentiment(data, timeframe)
  }), {} as TimeSentimentAnalysis);
}

function analyzeTimeframeSentiment(data: TokenData, timeframe: TimeframeKey): TimeBasedSentiment {
  const technicalScore = calculateTechnicalScore(data, timeframe);
  const priceChangeImpact = calculatePriceChangeImpact(data, timeframe);
  const totalScore = (technicalScore * 0.7 + priceChangeImpact * 0.3) * 100;

  let emotion: string;
  let confidence: number;

  if (totalScore >= 70) {
    emotion = priceChangeImpact >= 0 ? 'happy' : 'surprised';
    confidence = 0.95;
  } else if (totalScore >= 65) {
    emotion = priceChangeImpact >= 0 ? 'happy' : 'surprised';
    confidence = 0.85;
  } else if (totalScore >= 60) {
    emotion = 'neutral';
    confidence = 0.75;
  } else if (totalScore >= 55) {
    emotion = priceChangeImpact < 0 ? 'sad' : 'fearful';
    confidence = 0.85;
  } else if (totalScore >= 35) {
    emotion = priceChangeImpact < 0 ? 'angry' : 'fearful';
    confidence = 0.9;
  } else {
    emotion = 'disgusted';
    confidence = 0.95;
  }

  return { emotion, confidence, timeframe };
}

function calculateTechnicalScore(data: TokenData, timeframe: TimeframeKey): number {
  let score = 0;
  let totalWeight = 0;

  // RSI Analysis
  const rsiWeight = TECHNICAL_WEIGHTS.rsi[timeframe];
  const rsiScore = data.technicalIndicators.rsi > 70 ? 0.2 :
                  data.technicalIndicators.rsi < 30 ? 0.8 :
                  0.5;
  score += rsiScore * rsiWeight;
  totalWeight += rsiWeight;

  // MACD Analysis
  const macdWeight = TECHNICAL_WEIGHTS.macd[timeframe];
  const macdScore = data.technicalIndicators.macd.histogram > 0 ? 0.8 :
                   data.technicalIndicators.macd.histogram < 0 ? 0.2 :
                   0.5;
  score += macdScore * macdWeight;
  totalWeight += macdWeight;

  // Bollinger Bands Analysis
  const bbWeight = TECHNICAL_WEIGHTS.bollinger[timeframe];
  const price = data.price;
  const bbScore = price > data.technicalIndicators.bollingerBands.upper ? 0.2 :
                 price < data.technicalIndicators.bollingerBands.lower ? 0.8 :
                 0.5;
  score += bbScore * bbWeight;
  totalWeight += bbWeight;

  return score / totalWeight;
}

function calculatePriceChangeImpact(data: TokenData, timeframe: TimeframeKey): number {
  const change = data.priceChange24h;
  const timeframeMultiplier = TIMEFRAME_MULTIPLIERS[timeframe];
  return Math.tanh(change * timeframeMultiplier * 0.1);
}