import { Candle, ChartPattern } from '../../types/chart';
import { detectCandles } from './recognition/candleDetection';

export function drawAnnotations(
  ctx: CanvasRenderingContext2D,
  pattern: ChartPattern,
  width: number,
  height: number
): void {
  // Get image data for candle detection
  const imageData = ctx.getImageData(0, 0, width, height);
  const candles = detectCandles(imageData);

  if (candles.length === 0) return;

  // Set drawing style
  ctx.strokeStyle = pattern.type === 'bullish' ? '#10B981' : '#EF4444';
  ctx.lineWidth = 2;

  // Draw pattern lines based on actual candle positions
  drawPatternLines(ctx, candles, pattern);
}

function drawPatternLines(
  ctx: CanvasRenderingContext2D,
  candles: Candle[],
  pattern: ChartPattern
): void {
  const pivots = findPivotPoints(candles);
  
  ctx.beginPath();
  ctx.setLineDash([5, 5]);

  switch (pattern.name.toLowerCase()) {
    case 'double bottom':
      drawSupportLine(ctx, pivots.lows.slice(-2));
      break;
      
    case 'ascending triangle':
      drawResistanceLine(ctx, pivots.highs.slice(-3));
      drawTrendLine(ctx, pivots.lows.slice(-3));
      break;
      
    case 'head and shoulders':
      drawNeckline(ctx, pivots);
      break;
      
    case 'cup and handle':
      drawCupPattern(ctx, candles);
      break;
  }
  
  ctx.setLineDash([]);
}

function findPivotPoints(candles: Candle[]) {
  const pivots = {
    highs: [] as Candle[],
    lows: [] as Candle[]
  };

  const window = 3;

  for (let i = window; i < candles.length - window; i++) {
    const current = candles[i];
    const before = candles.slice(i - window, i);
    const after = candles.slice(i + 1, i + window + 1);

    if (before.every(c => c.high <= current.high) && 
        after.every(c => c.high <= current.high)) {
      pivots.highs.push(current);
    }

    if (before.every(c => c.low >= current.low) && 
        after.every(c => c.low >= current.low)) {
      pivots.lows.push(current);
    }
  }

  return pivots;
}

function drawTrendLine(ctx: CanvasRenderingContext2D, points: Candle[]) {
  if (points.length < 2) return;
  
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].low);
  
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].low);
  }
  
  ctx.stroke();
}

function drawSupportLine(ctx: CanvasRenderingContext2D, points: Candle[]) {
  if (points.length < 2) return;
  
  const avgLow = points.reduce((sum, p) => sum + p.low, 0) / points.length;
  
  ctx.beginPath();
  ctx.moveTo(points[0].x, avgLow);
  ctx.lineTo(points[points.length - 1].x, avgLow);
  ctx.stroke();
}

function drawResistanceLine(ctx: CanvasRenderingContext2D, points: Candle[]) {
  if (points.length < 2) return;
  
  const avgHigh = points.reduce((sum, p) => sum + p.high, 0) / points.length;
  
  ctx.beginPath();
  ctx.moveTo(points[0].x, avgHigh);
  ctx.lineTo(points[points.length - 1].x, avgHigh);
  ctx.stroke();
}

function drawNeckline(ctx: CanvasRenderingContext2D, pivots: { highs: Candle[]; lows: Candle[] }) {
  const shoulders = pivots.highs.slice(-3);
  if (shoulders.length < 3) return;
  
  const necklineY = (shoulders[0].low + shoulders[2].low) / 2;
  
  ctx.beginPath();
  ctx.moveTo(shoulders[0].x, necklineY);
  ctx.lineTo(shoulders[2].x, necklineY);
  ctx.stroke();
}

function drawCupPattern(ctx: CanvasRenderingContext2D, candles: Candle[]) {
  const cupPoints = candles.slice(-10);
  if (cupPoints.length < 10) return;
  
  ctx.beginPath();
  ctx.moveTo(cupPoints[0].x, cupPoints[0].close);
  
  // Draw cup curve
  const cp1x = cupPoints[3].x;
  const cp1y = cupPoints[5].low;
  const cp2x = cupPoints[7].x;
  const cp2y = cupPoints[5].low;
  
  ctx.bezierCurveTo(
    cp1x, cp1y,
    cp2x, cp2y,
    cupPoints[9].x, cupPoints[9].close
  );
  
  ctx.stroke();
}