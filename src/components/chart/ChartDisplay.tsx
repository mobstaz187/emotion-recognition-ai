import React, { useRef, useEffect } from 'react';
import { Level } from '../../types/chart';
import { drawLevels } from '../../utils/chart/drawing';

interface Props {
  image: string;
  levels: Level[];
  isAnalyzing: boolean;
}

export const ChartDisplay: React.FC<Props> = ({ image, levels, isAnalyzing }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (canvasRef.current && containerRef.current && image && levels.length > 0) {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        // Calculate aspect ratio
        const aspectRatio = img.width / img.height;
        const maxWidth = containerRef.current!.offsetWidth;
        const width = Math.min(maxWidth, img.width);
        const height = width / aspectRatio;

        // Set canvas dimensions
        const canvas = canvasRef.current!;
        canvas.width = width;
        canvas.height = height;
        
        drawLevels(canvas, img, levels);
      };
    }
  }, [image, levels]);

  return (
    <div 
      ref={containerRef}
      className="relative flex justify-center items-center bg-black/20 rounded-lg p-4"
    >
      <canvas
        ref={canvasRef}
        className="w-full rounded-lg border border-white/10"
      />
      {isAnalyzing && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-lg">
          <div className="text-primary animate-pulse">Analyzing chart...</div>
        </div>
      )}
    </div>
  );
};