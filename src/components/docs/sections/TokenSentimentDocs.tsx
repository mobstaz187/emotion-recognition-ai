import React from 'react';

export const TokenSentimentDocs: React.FC = () => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Token Sentiment Analysis</h2>
      <div className="prose dark:prose-invert max-w-none">
        <h3 className="text-xl font-medium mb-2">Analysis Components</h3>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Technical Analysis
            <ul className="list-disc pl-6 mt-1">
              <li>RSI (Relative Strength Index)</li>
              <li>MACD (Moving Average Convergence Divergence)</li>
              <li>Bollinger Bands</li>
              <li>Volume Analysis</li>
            </ul>
          </li>
          <li>Fundamental Analysis
            <ul className="list-disc pl-6 mt-1">
              <li>Market Cap Evaluation</li>
              <li>Liquidity Analysis</li>
              <li>Volume to Market Cap Ratio</li>
            </ul>
          </li>
        </ul>

        <h3 className="text-xl font-medium mb-2">Sentiment Calculation</h3>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Signal Collection
            <ul className="list-disc pl-6 mt-1">
              <li>Gather technical indicators</li>
              <li>Analyze price action</li>
              <li>Evaluate volume patterns</li>
            </ul>
          </li>
          <li>Signal Classification
            <ul className="list-disc pl-6 mt-1">
              <li>Bullish signals</li>
              <li>Bearish signals</li>
              <li>Neutral signals</li>
            </ul>
          </li>
          <li>Sentiment Scoring
            <ul className="list-disc pl-6 mt-1">
              <li>Weight-based calculation</li>
              <li>Signal strength evaluation</li>
              <li>Confidence scoring</li>
            </ul>
          </li>
        </ol>
      </div>
    </section>
  );
};