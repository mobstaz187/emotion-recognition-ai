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

  useEffect(() => {
    if (canvasRef.current && containerRef.current && image && levels.length > 0) {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        const maxWidth = containerRef.current!.offsetWidth;
        const width = Math.min(maxWidth, img.width);
        const height = width / aspectRatio;

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