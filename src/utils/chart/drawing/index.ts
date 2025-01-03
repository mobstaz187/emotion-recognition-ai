import { findSupportResistanceLevels } from '../analysis/levels';
import { drawSupportResistance } from './levels';
import { drawPattern } from './patterns';
import { drawPrediction } from './prediction';
import { predictNextMove } from '../prediction/pricePredictor';
import { Candle, ChartPattern } from '../../../types/chart';

export function drawAnnotations(
  ctx: CanvasRenderingContext2D,
  pattern: ChartPattern,
  width: number,
  height: number
): void {
  // Draw detected pattern
  drawPattern(ctx, pattern, width, height);

  // Find and draw support/resistance levels
  const candles = detectCandles(ctx.getImageData(0, 0, width, height));
  if (candles.length > 0) {
    const levels = findSupportResistanceLevels(candles);
    drawSupportResistance(ctx, levels, width);

    // Add price prediction
    const prediction = predictNextMove(candles);
    const currentPrice = candles[candles.length - 1].close;
    drawPrediction(ctx, prediction, currentPrice, width, height);
  }
}