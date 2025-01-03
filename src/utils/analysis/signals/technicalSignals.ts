import { TechnicalIndicators } from '../../../types/token';

export function analyzeTechnicalSignals(indicators: TechnicalIndicators) {
  const signals = {
    bullish: [] as string[],
    bearish: [] as string[],
    neutral: [] as string[]
  };

  // RSI Analysis
  if (indicators.rsi > 70) {
    signals.bearish.push('RSI indicates overbought conditions at ' + indicators.rsi.toFixed(2));
  } else if (indicators.rsi < 30) {
    signals.bullish.push('RSI indicates oversold conditions at ' + indicators.rsi.toFixed(2));
  } else {
    signals.neutral.push('RSI in neutral territory at ' + indicators.rsi.toFixed(2));
  }

  // MACD Analysis
  if (indicators.macd.histogram > 0 && indicators.macd.histogram > indicators.macd.signal) {
    signals.bullish.push('MACD histogram showing increasing bullish momentum');
  } else if (indicators.macd.histogram < 0 && indicators.macd.histogram < indicators.macd.signal) {
    signals.bearish.push('MACD histogram showing increasing bearish momentum');
  }

  // Bollinger Bands Analysis
  const price = indicators.bollingerBands.middle;
  if (price > indicators.bollingerBands.upper) {
    signals.bearish.push('Price trading above upper Bollinger Band - potential reversal');
  } else if (price < indicators.bollingerBands.lower) {
    signals.bullish.push('Price trading below lower Bollinger Band - potential bounce');
  }

  return signals;
}