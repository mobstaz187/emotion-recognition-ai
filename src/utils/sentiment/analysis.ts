import { TokenData } from '../../types/token';
import { EmotionType } from '../emotionTypes';

interface SentimentResult {
  emotion: EmotionType;
  confidence: number;
  reason: string;
}

export function analyzeSentiment(data: TokenData): SentimentResult {
  // Volume analysis
  const volumeToMarketCapRatio = data.volume24h / data.marketCap;
  const isHighVolume = volumeToMarketCapRatio > 0.2; // 20% volume/mcap ratio threshold
  
  // Price movement analysis
  const isStrongPositive = data.priceChange24h > 10;
  const isPositive = data.priceChange24h > 0;
  const isStrongNegative = data.priceChange24h < -10;
  
  // Sentiment logic
  if (isStrongPositive && isHighVolume) {
    return {
      emotion: 'happy',
      confidence: 0.9,
      reason: 'Strong price increase with high trading volume'
    };
  }
  
  if (isStrongNegative && isHighVolume) {
    return {
      emotion: 'fearful',
      confidence: 0.8,
      reason: 'Sharp price decline with high trading volume'
    };
  }
  
  if (isHighVolume && !isStrongPositive && !isStrongNegative) {
    return {
      emotion: 'surprised',
      confidence: 0.7,
      reason: 'High trading activity with moderate price movement'
    };
  }
  
  if (isPositive && !isHighVolume) {
    return {
      emotion: 'neutral',
      confidence: 0.6,
      reason: 'Positive price movement but low trading activity'
    };
  }
  
  if (!isPositive && !isHighVolume) {
    return {
      emotion: 'sad',
      confidence: 0.7,
      reason: 'Price decline with low trading activity'
    };
  }
  
  return {
    emotion: 'neutral',
    confidence: 0.5,
    reason: 'No significant market activity'
  };
}