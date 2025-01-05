import { Level } from '../../types/chart';

export function drawLevels(
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  levels: Level[]
) {
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
    
    // Style based on level type
    ctx.strokeStyle = level.type === 'support' ? '#10B981' : '#EF4444';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.stroke();

    // Add annotation
    ctx.font = '14px sans-serif';
    ctx.fillStyle = level.type === 'support' ? '#10B981' : '#EF4444';
    
    // Position text based on level type
    const text = level.type.toUpperCase();
    const padding = 10;
    
    if (level.type === 'support') {
      ctx.textAlign = 'left';
      ctx.fillText(text, padding, y - 5);
    } else {
      ctx.textAlign = 'right';
      ctx.fillText(text, canvas.width - padding, y - 5);
    }
  });
}