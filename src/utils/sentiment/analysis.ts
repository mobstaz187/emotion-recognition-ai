import { TokenData } from '../../types/token';
import { EmotionType } from '../emotionTypes';
import { 
  analyzeTechnicalSignals, 
  analyzeVolumeSignals,
  analyzePriceSignals,
  analyzeHolderSignals,
  analyzeMarketStructure,
  analyzeMomentum
} from '../analysis/signals';

interface SentimentResult {
  emotion: EmotionType;
  confidence: number;
  reason: string;
  signals: {
    bullish: string[];
    bearish: string[];
    neutral: string[];
  };
}

export function analyzeSentiment(data: TokenData): SentimentResult {
  // Collect signals from all analysis modules
  const technicalSignals = analyzeTechnicalSignals(data.technicalIndicators);
  const volumeSignals = analyzeVolumeSignals(data);
  const priceSignals = analyzePriceSignals(data);
  const holderSignals = analyzeHolderSignals(data);
  const structureSignals = analyzeMarketStructure(data, data.technicalIndicators);
  const momentumSignals = analyzeMomentum(data, data.technicalIndicators);

  // Combine all signals
  const signals = {
    bullish: [
      ...technicalSignals.bullish,
      ...volumeSignals.bullish,
      ...priceSignals.bullish,
      ...holderSignals.bullish,
      ...structureSignals.bullish,
      ...momentumSignals.bullish
    ],
    bearish: [
      ...technicalSignals.bearish,
      ...volumeSignals.bearish,
      ...priceSignals.bearish,
      ...holderSignals.bearish,
      ...structureSignals.bearish,
      ...momentumSignals.bearish
    ],
    neutral: [
      ...technicalSignals.neutral,
      ...volumeSignals.neutral,
      ...priceSignals.neutral,
      ...holderSignals.neutral,
      ...structureSignals.neutral,
      ...momentumSignals.neutral
    ]
  };

  // Calculate signal-based scores
  const bullishScore = signals.bullish.length * 25;
  const bearishScore = signals.bearish.length * 25;
  const totalSignals = signals.bullish.length + signals.bearish.length + signals.neutral.length;

  // Calculate weighted score (0-100) with signal influence
  const signalScore = Math.min(100, Math.max(0, (bullishScore - bearishScore) / (totalSignals * 25) * 100 + 50));
  const technicalScore = (data.technicalIndicators.rsi / 100) * 100;
  
  // Combine scores with higher weight on signals
  const score = (signalScore * 0.7) + (technicalScore * 0.3);

  // Determine emotion and confidence with adjusted thresholds
  let emotion: EmotionType;
  let confidence: number;

  if (score >= 75) {
    emotion = 'happy';
    confidence = 0.9;
  } else if (score >= 60) {
    emotion = 'surprised';
    confidence = 0.85;
  } else if (score >= 45) {
    emotion = 'neutral';
    confidence = 0.7;
  } else if (score >= 40) {
    emotion = 'sad';
    confidence = 0.8;
  } else if (score >= 35) {
    emotion = 'fearful';
    confidence = 0.85;
  } else if (score >= 15) {
    emotion = 'angry';
    confidence = 0.9;
  } else {
    emotion = 'disgusted';
    confidence = 0.95;
  }

  // Generate summary reason
  const reason = `Market sentiment is ${emotion} with a ${score.toFixed(1)}% bullish bias. 
    Found ${signals.bullish.length} bullish, ${signals.bearish.length} bearish, and 
    ${signals.neutral.length} neutral signals.`;

  return {
    emotion,
    confidence,
    reason,
    signals
  };
}