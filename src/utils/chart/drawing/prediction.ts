import { PricePrediction } from '../prediction/pricePredictor';

export function drawPrediction(
  ctx: CanvasRenderingContext2D,
  prediction: PricePrediction,
  currentPrice: number,
  width: number,
  height: number
): void {
  ctx.save();

  // Set styles based on prediction direction
  const color = prediction.direction === 'up' ? '#10B981' : 
                prediction.direction === 'down' ? '#EF4444' : 
                '#6B7280';
                
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 2;
  ctx.setLineDash([5, 5]);

  // Calculate positions
  const startX = width - 100; // Start from near the right edge
  const startY = height / 2; // Current price level
  const endX = width - 20; // End near the right edge
  const endY = startY - ((prediction.targetPrice - currentPrice) / currentPrice) * height * 0.2;

  // Draw prediction line
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();

  // Draw arrow
  const arrowSize = 8;
  const angle = Math.atan2(endY - startY, endX - startX);
  
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.moveTo(endX, endY);
  ctx.lineTo(
    endX - arrowSize * Math.cos(angle - Math.PI / 6),
    endY - arrowSize * Math.sin(angle - Math.PI / 6)
  );
  ctx.lineTo(
    endX - arrowSize * Math.cos(angle + Math.PI / 6),
    endY - arrowSize * Math.sin(angle + Math.PI / 6)
  );
  ctx.closePath();
  ctx.fill();

  // Draw confidence indicator
  const confidenceWidth = 40;
  const confidenceHeight = 3;
  const confidenceX = endX - confidenceWidth / 2;
  const confidenceY = endY + 10;

  ctx.fillStyle = '#4B5563';
  ctx.fillRect(
    confidenceX,
    confidenceY,
    confidenceWidth,
    confidenceHeight
  );

  ctx.fillStyle = color;
  ctx.fillRect(
    confidenceX,
    confidenceY,
    confidenceWidth * prediction.confidence,
    confidenceHeight
  );

  ctx.restore();
}