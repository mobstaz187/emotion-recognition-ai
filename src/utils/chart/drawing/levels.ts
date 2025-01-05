import { Level } from '../../../types/chart';

export function drawLevels(
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  levels: Level[]
): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Draw the original chart
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  // Draw levels
  levels.forEach(level => {
    const y = canvas.height - (level.price * canvas.height / 100);
    
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    
    ctx.strokeStyle = level.type === 'support' ? '#10B981' : '#EF4444';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.stroke();

    // Add label
    ctx.font = '14px sans-serif';
    ctx.fillStyle = level.type === 'support' ? '#10B981' : '#EF4444';
    ctx.textAlign = level.type === 'support' ? 'left' : 'right';
    const text = level.type.toUpperCase();
    const padding = 10;
    ctx.fillText(text, level.type === 'support' ? padding : canvas.width - padding, y - 5);
  });
}