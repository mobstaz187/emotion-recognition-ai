import { useState } from 'react';
import { Level, ColorThresholds, WeightSettings } from '../types/chart';
import { analyzeChart } from '../utils/chart/analysis';

export function useChartAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const reset = () => {
    setIsAnalyzing(false);
  };

  const analyze = async (
    imageUrl: string, 
    thresholds: ColorThresholds,
    weightSettings?: WeightSettings
  ): Promise<Level[]> => {
    setIsAnalyzing(true);
    try {
      const result = await analyzeChart(imageUrl, thresholds, weightSettings);
      return result;
    } catch (error) {
      console.error('Chart analysis failed:', error);
      return [];
    } finally {
      setIsAnalyzing(false);
    }
  };

  return { isAnalyzing, analyze, reset };
}