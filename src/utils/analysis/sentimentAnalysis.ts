import { TokenData } from '../../types/token';
import { EmotionType } from '../emotionTypes';

interface SentimentSignals {
  bullish: string[];
  bearish: string[];
  neutral: string[];
}

interface SentimentResult {
  emotion: EmotionType;
  confidence: number;
  reason: string;
  signals: SentimentSignals;
}

export function analyzeSentiment(data: TokenData): SentimentResult {
  const signals: SentimentSignals = {
    bullish: [],
    bearish: [],
    neutral: []
  };

  // Technical Analysis
  if (data.technicalIndicators.rsi > 70) {
    signals.bearish.push('RSI indicates overbought conditions');
  } else if (data.technicalIndicators.rsi < 30) {
    signals.bullish.push('RSI indicates oversold conditions');
  } else {
    signals.neutral.push(`RSI at neutral levels (${data.technicalIndicators.rsi.toFixed(2)})`);
  }

  if (data.technicalIndicators.macd.histogram > 0) {
    signals.bullish.push('MACD shows positive momentum');
  } else {
    signals.bearish.push('MACD shows negative momentum');
  }

  // Price Action
  if (data.priceChange24h > 5) {
    signals.bullish.push(`Strong price increase (+${data.priceChange24h.toFixed(2)}%)`);
  } else if (data.priceChange24h < -5) {
    signals.bearish.push(`Significant price decrease (${data.priceChange24h.toFixed(2)}%)`);
  } else {
    signals.neutral.push(`Stable price action (${data.priceChange24h.toFixed(2)}%)`);
  }

  // Volume Analysis
  const volumeToMcap = data.volume24h / data.marketCap;
  if (volumeToMcap > 0.2) {
    signals.bullish.push('High trading volume relative to market cap');
  } else if (volumeToMcap < 0.05) {
    signals.bearish.push('Low trading volume relative to market cap');
  } else {
    signals.neutral.push('Moderate trading volume');
  }

  // Calculate sentiment scores
  const bullishScore = signals.bullish.length * 20;
  const bearishScore = signals.bearish.length * 20;
  const totalSignals = signals.bullish.length + signals.bearish.length + signals.neutral.length;
  
  // Calculate weighted score
  const score = (bullishScore - bearishScore) / totalSignals + 50;

  // Determine emotion and confidence
  let emotion: EmotionType;
  let confidence: number;

  if (score >= 60) {
    emotion = 'happy';
    confidence = 0.8 + (score - 70) / 100;
  } else if (score >= 45) {
    emotion = 'surprised';
    confidence = 0.7 + (score - 55) / 50;
  } else if (score >= 35) {
    emotion = 'neutral';
    confidence = 0.6 + Math.abs(50 - score) / 50;
  } else if (score >= 20) {
    emotion = 'sad';
    confidence = 0.7 + (45 - score) / 50;
  } else {
    emotion = 'fearful';
    confidence = 0.8 + (30 - score) / 100;
  }

  // Generate summary reason
  const reason = `Market sentiment is ${emotion} with a ${score.toFixed(1)}% bullish bias. 
    Found ${signals.bullish.length} bullish, ${signals.bearish.length} bearish, and 
    ${signals.neutral.length} neutral signals.`;

  return {
    emotion,
    confidence: Math.min(confidence, 0.95),
    reason,
    signals
  };
}