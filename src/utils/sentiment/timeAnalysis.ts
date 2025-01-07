import { TokenData } from '../../types/token';
import { TimeSentimentAnalysis, TimeBasedSentiment } from '../../types/timeframe';

type TimeframeWeights = {
  [key: string]: {
    [timeframe: string]: number;
  };
};

const TECHNICAL_WEIGHTS: TimeframeWeights = {
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

export function analyzeAllTimeframes(data: TokenData): TimeSentimentAnalysis {
  const timeframes = ['1m', '15m', '30m', '1h', '4h', '24h'] as const;
  
  const result = {} as TimeSentimentAnalysis;

  timeframes.forEach(timeframe => {
    const sentiment = analyzeTimeframeSentiment(data, timeframe);
    result[timeframe] = sentiment;
  });

  return result;
}

function analyzeTimeframeSentiment(data: TokenData, timeframe: string): TimeBasedSentiment {
  // Calculate technical score based on weighted indicators
  const technicalScore = calculateTechnicalScore(data, timeframe);
  
  // Map score to emotion and confidence
  const { emotion, confidence } = mapScoreToEmotion(technicalScore);

  return {
    emotion,
    confidence,
    timeframe
  };
}

function calculateTechnicalScore(data: TokenData, timeframe: string): number {
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

function mapScoreToEmotion(score: number): { emotion: string; confidence: number } {
  if (score >= 0.8) {
    return { emotion: 'happy', confidence: 0.9 };
  } else if (score >= 0.6) {
    return { emotion: 'surprised', confidence: 0.8 };
  } else if (score >= 0.4) {
    return { emotion: 'neutral', confidence: 0.7 };
  } else if (score >= 0.3) {
    return { emotion: 'sad', confidence: 0.8 };
  } else if (score >= 0.2) {
    return { emotion: 'fearful', confidence: 0.85 };
  } else {
    return { emotion: 'disgusted', confidence: 0.9 };
  }
}