import { PriceLevel } from '../../../types/chart';

export function drawSupportResistance(
  ctx: CanvasRenderingContext2D,
  levels: PriceLevel[],
  width: number
): void {
  ctx.save();

  levels.forEach(level => {
    // Set style based on level type
    ctx.strokeStyle = level.type === 'support' ? '#10B981' : '#EF4444';
    ctx.lineWidth = Math.min(level.strength, 3);
    ctx.setLineDash([5, 5]);

    // Draw level line
    ctx.beginPath();
    ctx.moveTo(0, level.price);
    ctx.lineTo(width, level.price);
    ctx.stroke();

    // Add label
    ctx.font = '12px monospace';
    ctx.fillStyle = level.type === 'support' ? '#10B981' : '#EF4444';
    ctx.fillText(
      `${level.type.charAt(0).toUpperCase()}${level.type.slice(1)}`,
      10,
      level.price - 5
    );
  });

  ctx.restore();
}