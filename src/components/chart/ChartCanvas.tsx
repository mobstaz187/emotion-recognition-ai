import React, { useEffect, useRef } from 'react';
import { ChartAnalysisResult } from '../../types/chart';
import { drawLevels, drawPatterns } from '../../utils/chart/drawing';

interface Props {
  result: ChartAnalysisResult;
  image: HTMLImageElement;
}

export const ChartCanvas: React.FC<Props> = ({ result, image }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !result || !image) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = image.width;
    canvas.height = image.height;

    // Draw chart elements
    drawLevels(canvas, image, result.levels);
    result.patterns.forEach(pattern => drawPatterns(ctx, pattern));
  }, [result, image]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};