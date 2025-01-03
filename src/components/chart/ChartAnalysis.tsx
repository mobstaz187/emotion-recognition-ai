import React, { useState } from 'react';
import { ChartUpload } from './ChartUpload';
import { ChartResult } from './ChartResult';
import { analyzeChart } from '../../utils/chart/analysis';
import type { ChartAnalysisResult } from '../../types/chart';

export const ChartAnalysis: React.FC = () => {
  const [result, setResult] = useState<ChartAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChartUpload = async (file: File) => {
    setIsAnalyzing(true);
    setError(null);
    
    try {
      const analysis = await analyzeChart(file);
      setResult(analysis);
    } catch (error) {
      console.error('Chart analysis failed:', error);
      setError('Failed to analyze chart. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-black/30 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
        <h2 className="text-2xl font-bold mb-6">Chart Analysis</h2>
        
        <ChartUpload onUpload={handleChartUpload} isAnalyzing={isAnalyzing} />
        
        {isAnalyzing && (
          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-400">
              Analyzing chart patterns and market structure...
            </p>
          </div>
        )}

        {error && (
          <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
            {error}
          </div>
        )}

        {result && !isAnalyzing && <ChartResult analysis={result} />}
      </div>
    </div>
  );
};