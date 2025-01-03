import { ChartPattern } from '../../../types/chart';

export function drawPattern(
  ctx: CanvasRenderingContext2D,
  pattern: ChartPattern,
  width: number,
  height: number
): void {
  ctx.save();

  // Set pattern drawing style
  ctx.strokeStyle = pattern.type === 'bullish' ? '#10B981' : '#EF4444';
  ctx.lineWidth = 2;
  ctx.setLineDash([5, 5]);

  // Draw pattern based on type
  switch (pattern.name.toLowerCase()) {
    case 'double bottom':
      drawDoubleBottom(ctx, width, height);
      break;
    case 'head and shoulders':
      drawHeadAndShoulders(ctx, width, height);
      break;
    case 'ascending triangle':
      drawAscendingTriangle(ctx, width, height);
      break;
    case 'cup and handle':
      drawCupAndHandle(ctx, width, height);
      break;
    case 'bull flag':
      drawBullFlag(ctx, width, height);
      break;
    case 'bear flag':
      drawBearFlag(ctx, width, height);
      break;
  }

  // Add pattern label
  ctx.font = '14px monospace';
  ctx.fillStyle = pattern.type === 'bullish' ? '#10B981' : '#EF4444';
  ctx.fillText(pattern.name, 10, 30);

  ctx.restore();
}

function drawDoubleBottom(ctx: CanvasRenderingContext2D, width: number, height: number): void {
  const y = height * 0.7;
  const points = [
    { x: width * 0.2, y: height * 0.5 },
    { x: width * 0.35, y },
    { x: width * 0.5, y: height * 0.6 },
    { x: width * 0.65, y },
    { x: width * 0.8, y: height * 0.5 }
  ];

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  points.forEach(point => ctx.lineTo(point.x, point.y));
  ctx.stroke();

  // Draw support line
  ctx.beginPath();
  ctx.moveTo(width * 0.35, y);
  ctx.lineTo(width * 0.65, y);
  ctx.stroke();
}

function drawHeadAndShoulders(ctx: CanvasRenderingContext2D, width: number, height: number): void {
  const baseY = height * 0.6;
  
  // Draw pattern
  ctx.beginPath();
  ctx.moveTo(width * 0.2, baseY);
  ctx.lineTo(width * 0.3, height * 0.4); // Left shoulder
  ctx.lineTo(width * 0.4, height * 0.5);
  ctx.lineTo(width * 0.5, height * 0.3); // Head
  ctx.lineTo(width * 0.6, height * 0.5);
  ctx.lineTo(width * 0.7, height * 0.4); // Right shoulder
  ctx.lineTo(width * 0.8, baseY);
  ctx.stroke();

  // Draw neckline
  ctx.beginPath();
  ctx.moveTo(width * 0.2, baseY);
  ctx.lineTo(width * 0.8, baseY);
  ctx.stroke();
}

function drawAscendingTriangle(ctx: CanvasRenderingContext2D, width: number, height: number): void {
  const resistanceY = height * 0.3;
  
  // Draw resistance line
  ctx.beginPath();
  ctx.moveTo(width * 0.2, resistanceY);
  ctx.lineTo(width * 0.8, resistanceY);
  ctx.stroke();

  // Draw ascending support line
  ctx.beginPath();
  ctx.moveTo(width * 0.2, height * 0.7);
  ctx.lineTo(width * 0.8, height * 0.3);
  ctx.stroke();
}

function drawCupAndHandle(ctx: CanvasRenderingContext2D, width: number, height: number): void {
  const startY = height * 0.4;
  
  // Draw cup
  ctx.beginPath();
  ctx.moveTo(width * 0.2, startY);
  ctx.quadraticCurveTo(
    width * 0.5, height * 0.7,
    width * 0.7, startY
  );
  
  // Draw handle
  ctx.lineTo(width * 0.75, height * 0.5);
  ctx.lineTo(width * 0.8, startY);
  ctx.stroke();
}

function drawBullFlag(ctx: CanvasRenderingContext2D, width: number, height: number): void {
  // Draw flagpole
  ctx.beginPath();
  ctx.moveTo(width * 0.3, height * 0.7);
  ctx.lineTo(width * 0.3, height * 0.3);
  ctx.stroke();

  // Draw flag
  ctx.beginPath();
  ctx.moveTo(width * 0.3, height * 0.3);
  ctx.lineTo(width * 0.7, height * 0.4);
  ctx.moveTo(width * 0.3, height * 0.35);
  ctx.lineTo(width * 0.7, height * 0.45);
  ctx.stroke();
}

function drawBearFlag(ctx: CanvasRenderingContext2D, width: number, height: number): void {
  // Draw flagpole
  ctx.beginPath();
  ctx.moveTo(width * 0.3, height * 0.3);
  ctx.lineTo(width * 0.3, height * 0.7);
  ctx.stroke();

  // Draw flag
  ctx.beginPath();
  ctx.moveTo(width * 0.3, height * 0.7);
  ctx.lineTo(width * 0.7, height * 0.6);
  ctx.moveTo(width * 0.3, height * 0.65);
  ctx.lineTo(width * 0.7, height * 0.55);
  ctx.stroke();
}