import React from 'react';
import { TokenData } from '../../types/token';
import { TechnicalIndicatorsPanel } from './panels/TechnicalIndicatorsPanel';
import { FundamentalAnalysisPanel } from './panels/FundamentalAnalysisPanel';
import { SentimentSummary } from './panels/SentimentSummary';
import { TimeframeAnalysis } from './panels/TimeframeAnalysis';
import { TimeframeSentiment } from './panels/TimeframeSentiment';
import { analyzeSentiment } from '../../utils/sentiment/analysis';
import { analyzeAllTimeframes } from '../../utils/sentiment/timeAnalysis';

interface Props {
  data: TokenData;
  address: string;
}

export const TokenAnalysisPanel: React.FC<Props> = ({ data, address }) => {
  const sentimentAnalysis = analyzeSentiment(data);
  const timeframeSentiments = analyzeAllTimeframes(data);

  return (
    <div className="space-y-6">
      {/* Overall Sentiment Summary */}
      <SentimentSummary 
        sentiment={data.sentiment} 
        analysis={sentimentAnalysis}
      />

      {/* Timeframe Sentiment */}
      <div className="bg-white/80 dark:bg-card/80 backdrop-blur-xl rounded-xl border border-border p-6">
        <h3 className="text-xl font-semibold text-foreground mb-4">Timeframe Analysis</h3>
        <TimeframeSentiment sentiments={timeframeSentiments} />
      </div>

      {/* Market Analysis */}
      <TimeframeAnalysis address={address} />
      
      {/* Technical & Fundamental Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TechnicalIndicatorsPanel indicators={data.technicalIndicators} />
        <FundamentalAnalysisPanel metrics={data} />
      </div>
    </div>
  );
};