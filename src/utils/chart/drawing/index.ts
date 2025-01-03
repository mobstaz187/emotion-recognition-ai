import { ChartPattern } from '../../../types/chart';
import { drawPattern } from './patterns';
import { drawSupportResistance } from './levels';
import { drawPrediction } from './prediction';
import { findKeyLevels } from '../analysis/levels';
import { detectCandles } from '../recognition/candleDetection';
import { predictNextMove } from '../prediction/pricePredictor';

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
    const levels = findKeyLevels(candles);
    drawSupportResistance(ctx, levels, width);

    // Add price prediction
    const prediction = predictNextMove(candles);
    const currentPrice = candles[candles.length - 1].close;
    drawPrediction(ctx, prediction, currentPrice, width, height);
  }
}