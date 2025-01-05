import { ChartPattern } from '../../../types/chart';

export function drawPattern(
  ctx: CanvasRenderingContext2D,
  pattern: ChartPattern
): void {
  if (pattern.points.length < 2) return;

  ctx.beginPath();
  ctx.moveTo(pattern.points[0].x, pattern.points[0].y);

  for (let i = 1; i < pattern.points.length; i++) {
    ctx.lineTo(pattern.points[i].x, pattern.points[i].y);
  }

  ctx.strokeStyle = '#8B5CF6';
  ctx.lineWidth = 2;
  ctx.stroke();
}

export const drawPatterns = drawPattern;