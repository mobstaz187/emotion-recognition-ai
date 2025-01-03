import React from 'react';
import { ChartCanvas } from './ChartCanvas';
import { PatternInfo } from './PatternInfo';
import type { ChartAnalysisResult } from '../../types/chart';

interface Props {
  analysis: ChartAnalysisResult;
}

export const ChartResult: React.FC<Props> = ({ analysis }) => {
  const { sentiment, confidence, signals, pattern, imageUrl } = analysis;
  
  return (
    <div className="mt-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Original Image */}
        {imageUrl && (
          <div className="w-full overflow-hidden rounded-xl border border-white/10">
            <img 
              src={imageUrl} 
              alt="Original chart"
              className="w-full h-auto"
            />
          </div>
        )}
        
        {/* Annotated Image */}
        {imageUrl && (
          <ChartCanvas 
            imageUrl={imageUrl} 
            analysis={analysis} 
            hideDownload 
            showAnnotations
          />
        )}
      </div>
      
      <div className="flex items-center gap-4">
        <div className={`text-4xl ${
          sentiment === 'bullish' ? 'text-green-400' : 'text-red-400'
        }`}>
          {sentiment === 'bullish' ? '📈' : '📉'}
        </div>
        <div>
          <h3 className={`text-xl font-bold capitalize ${
            sentiment === 'bullish' ? 'text-green-400' : 'text-red-400'
          }`}>
            {sentiment}
          </h3>
          <p className="text-gray-400">
            {Math.round(confidence * 100)}% confidence
          </p>
        </div>
      </div>

      {pattern && <PatternInfo pattern={pattern} />}

      <div className="space-y-4">
        {signals.map((signal, index) => (
          <div 
            key={index}
            className={`p-4 rounded-lg border ${
              signal.type === 'bullish' 
                ? 'border-green-500/20 bg-green-500/10' 
                : 'border-red-500/20 bg-red-500/10'
            }`}
          >
            <p className={`text-sm ${
              signal.type === 'bullish' ? 'text-green-400' : 'text-red-400'
            }`}>
              {signal.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};