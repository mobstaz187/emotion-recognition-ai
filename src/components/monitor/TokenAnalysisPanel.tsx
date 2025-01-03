import React from 'react';
import { TokenData } from '../../types/token';
import { TechnicalIndicatorsPanel } from './panels/TechnicalIndicatorsPanel';
import { FundamentalAnalysisPanel } from './panels/FundamentalAnalysisPanel';
import { SentimentSummary } from './panels/SentimentSummary';
import { analyzeSentiment } from '../../utils/analysis/sentimentAnalysis';

interface Props {
  data: TokenData;
}

export const TokenAnalysisPanel: React.FC<Props> = ({ data }) => {
  const sentimentAnalysis = analyzeSentiment(data);

  return (
    <div className="space-y-6">
      <SentimentSummary 
        sentiment={data.sentiment} 
        analysis={sentimentAnalysis}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TechnicalIndicatorsPanel indicators={data.technicalIndicators} />
        <FundamentalAnalysisPanel metrics={data} />
      </div>
    </div>
  );
};