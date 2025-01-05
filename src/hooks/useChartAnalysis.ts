import { useState, useCallback } from 'react';
import { Level, ColorThresholds } from '../types/chart';
import { analyzeChart } from '../utils/chart/analysis';

export function useChartAnalysis() {
  const [levels, setLevels] = useState<Level[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const reset = useCallback(() => {
    setLevels([]);
    setIsAnalyzing(false);
  }, []);

  const analyze = useCallback(async (imageUrl: string, thresholds: ColorThresholds) => {
    setIsAnalyzing(true);
    try {
      const result = await analyzeChart(imageUrl, thresholds);
      setLevels(result);
    } catch (error) {
      console.error('Chart analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  return { levels, isAnalyzing, analyze, reset };
}