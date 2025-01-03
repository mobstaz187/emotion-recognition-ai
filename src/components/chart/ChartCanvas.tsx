import React, { useRef, useEffect } from 'react';
import { drawAnnotations } from '../../utils/chart/drawing';
import type { ChartPattern, ChartAnalysisResult } from '../../types/chart';

interface Props {
  imageUrl: string;
  analysis: ChartAnalysisResult;
}

export const ChartCanvas: React.FC<Props> = ({ imageUrl, analysis }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>();

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create a temporary link element
    const link = document.createElement('a');
    link.download = `chart-analysis-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const img = new Image();
    img.src = imageUrl;
    imageRef.current = img;

    img.onload = () => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas size to match image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw image
      ctx.drawImage(img, 0, 0);

      // Draw pattern annotations
      if (analysis.pattern) {
        drawAnnotations(ctx, analysis.pattern, img.width, img.height);
      }
    };
  }, [imageUrl, analysis]);

  return (
    <div className="space-y-4">
      <div className="w-full overflow-hidden rounded-xl border border-white/10">
        <canvas 
          ref={canvasRef}
          className="w-full h-auto"
        />
      </div>
      <button
        onClick={handleDownload}
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg 
          transition-colors flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Download Analysis
      </button>
    </div>
  );
};