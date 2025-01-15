import React, { useRef, useEffect } from 'react';
import { Level } from '../../types/chart';
import { drawLevels } from '../../utils/chart/drawing';
import { useProfile } from '../../contexts/ProfileContext';

interface Props {
  image: string;
  levels: Level[];
  isAnalyzing: boolean;
  isInitialAnalysis?: boolean;
}

export const ChartDisplay: React.FC<Props> = ({ 
  image, 
  levels, 
  isAnalyzing,
  isInitialAnalysis = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { currentProfile } = useProfile();
  const profileColor = currentProfile?.color || '#3B82F6';

  // Check if image is a URL for an iframe
  const isIframeUrl = image?.includes('birdeye.so');

  useEffect(() => {
    if (canvasRef.current && containerRef.current) {
      const container = containerRef.current;
      const canvas = canvasRef.current;

      // Set canvas dimensions to match container
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;

      if (isIframeUrl) {
        // For iframes, just draw the levels
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          levels.forEach(level => {
            const y = canvas.height - (level.price * canvas.height / 100);
            
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            
            ctx.strokeStyle = level.type === 'support' ? '#10B981' : '#EF4444';
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.stroke();
          });
        }
      } else {
        // For regular images
        const img = new Image();
        img.src = image;
        img.onload = () => {
          const aspectRatio = img.width / img.height;
          canvas.width = container.offsetWidth;
          canvas.height = container.offsetWidth / aspectRatio;
          drawLevels(canvas, img, levels);
        };
      }
    }
  }, [image, levels, isIframeUrl]);

  return (
    <div 
      ref={containerRef}
      className="relative flex justify-center items-center bg-black/20 rounded-lg p-4"
    >
      {isIframeUrl ? (
        <div className="relative w-full aspect-[16/9]">
          <iframe
            src={image}
            className="absolute inset-0 w-full h-full rounded-lg border border-white/10"
            frameBorder="0"
            allowFullScreen
          />
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
          />
        </div>
      ) : (
        <canvas
          ref={canvasRef}
          className="w-full rounded-lg border border-white/10"
        />
      )}
      
      {isAnalyzing && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm rounded-lg">
          <div className="flex flex-col items-center gap-3">
            <div 
              className="w-8 h-8 border-3 border-t-transparent rounded-full animate-spin"
              style={{ borderColor: profileColor }}
            />
            <div className="text-sm" style={{ color: profileColor }}>
              {isInitialAnalysis ? 'Analyzing chart...' : 'Adjusting analysis...'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};