import { Point } from '../../types/chart';

// Helper functions
function drawSupportLine(ctx: CanvasRenderingContext2D, points: Point[]) {
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.stroke();
  ctx.setLineDash([]);
}

function drawResistanceLine(ctx: CanvasRenderingContext2D, points: Point[]) {
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.stroke();
  ctx.setLineDash([]);
}

// Pattern drawing functions
export function drawDoubleBottom(ctx: CanvasRenderingContext2D, width: number, height: number) {
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
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.stroke();

  drawSupportLine(ctx, [
    { x: width * 0.35, y },
    { x: width * 0.65, y }
  ]);
}

export function drawHeadAndShoulders(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const baseY = height * 0.6;
  ctx.beginPath();
  ctx.moveTo(width * 0.2, baseY);
  ctx.lineTo(width * 0.3, height * 0.4); // Left shoulder
  ctx.lineTo(width * 0.4, height * 0.5);
  ctx.lineTo(width * 0.5, height * 0.3); // Head
  ctx.lineTo(width * 0.6, height * 0.5);
  ctx.lineTo(width * 0.7, height * 0.4); // Right shoulder
  ctx.lineTo(width * 0.8, baseY);
  ctx.stroke();

  drawSupportLine(ctx, [
    { x: width * 0.2, y: baseY },
    { x: width * 0.8, y: baseY }
  ]);
}

export function drawAscendingTriangle(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const resistanceY = height * 0.3;
  const startY = height * 0.7;
  const endY = height * 0.3;

  // Draw resistance line
  drawResistanceLine(ctx, [
    { x: width * 0.2, y: resistanceY },
    { x: width * 0.8, y: resistanceY }
  ]);

  // Draw ascending support line
  ctx.beginPath();
  ctx.moveTo(width * 0.2, startY);
  ctx.lineTo(width * 0.8, endY);
  ctx.stroke();
}

export function drawCupAndHandle(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const startY = height * 0.4;
  const bottomY = height * 0.7;
  
  // Draw cup
  ctx.beginPath();
  ctx.moveTo(width * 0.2, startY);
  ctx.quadraticCurveTo(
    width * 0.5, bottomY,
    width * 0.7, startY
  );
  
  // Draw handle
  ctx.lineTo(width * 0.75, height * 0.5);
  ctx.lineTo(width * 0.8, startY);
  ctx.stroke();
}

export function drawDescendingTriangle(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const supportY = height * 0.7;
  const startY = height * 0.3;
  const endY = height * 0.7;

  // Draw support line
  drawSupportLine(ctx, [
    { x: width * 0.2, y: supportY },
    { x: width * 0.8, y: supportY }
  ]);

  // Draw descending resistance line
  ctx.beginPath();
  ctx.moveTo(width * 0.2, startY);
  ctx.lineTo(width * 0.8, endY);
  ctx.stroke();
}

export function drawBullFlag(ctx: CanvasRenderingContext2D, width: number, height: number) {
  // Draw flagpole
  ctx.beginPath();
  ctx.moveTo(width * 0.2, height * 0.7);
  ctx.lineTo(width * 0.2, height * 0.3);
  ctx.stroke();

  // Draw flag
  const flagStartY = height * 0.3;
  const flagEndY = height * 0.4;
  
  ctx.beginPath();
  ctx.moveTo(width * 0.2, flagStartY);
  ctx.lineTo(width * 0.8, flagEndY);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.moveTo(width * 0.2, flagStartY + height * 0.05);
  ctx.lineTo(width * 0.8, flagEndY + height * 0.05);
  ctx.stroke();
}

export function drawBearFlag(ctx: CanvasRenderingContext2D, width: number, height: number) {
  // Draw flagpole
  ctx.beginPath();
  ctx.moveTo(width * 0.2, height * 0.3);
  ctx.lineTo(width * 0.2, height * 0.7);
  ctx.stroke();

  // Draw flag
  const flagStartY = height * 0.7;
  const flagEndY = height * 0.6;
  
  ctx.beginPath();
  ctx.moveTo(width * 0.2, flagStartY);
  ctx.lineTo(width * 0.8, flagEndY);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.moveTo(width * 0.2, flagStartY - height * 0.05);
  ctx.lineTo(width * 0.8, flagEndY - height * 0.05);
  ctx.stroke();
}