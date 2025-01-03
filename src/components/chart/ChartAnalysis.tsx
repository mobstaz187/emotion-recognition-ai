import React, { useState } from 'react';
import { ChartUpload } from './ChartUpload';
import { ChartResult } from './ChartResult';
import { analyzeChart } from '../../utils/chart/analysis';
import type { ChartAnalysisResult } from '../../types/chart';

export const ChartAnalysis: React.FC = () => {
  const [result, setResult] = useState<ChartAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleChartUpload = async (file: File) => {
    setIsAnalyzing(true);
    try {
      const analysis = await analyzeChart(file);
      setResult(analysis);
    } catch (error) {
      console.error('Chart analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-black/30 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
        <h2 className="text-2xl font-bold mb-6">Chart Analysis</h2>
        <ChartUpload onUpload={handleChartUpload} isAnalyzing={isAnalyzing} />
        {result && <ChartResult analysis={result} />}
      </div>
    </div>
  );
};