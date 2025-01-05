import React from 'react';

export const ChartAnalysisDocs: React.FC = () => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Chart Analysis Algorithm</h2>
      <div className="prose dark:prose-invert max-w-none">
        <h3 className="text-xl font-medium mb-2">Detection Pipeline</h3>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Color Analysis
            <ul className="list-disc pl-6 mt-1">
              <li>RGB channel separation</li>
              <li>Candlestick pattern detection</li>
              <li>Color threshold optimization</li>
            </ul>
          </li>
          <li>Level Detection
            <ul className="list-disc pl-6 mt-1">
              <li>Support level identification</li>
              <li>Resistance level detection</li>
              <li>Level strength calculation</li>
            </ul>
          </li>
          <li>Pattern Recognition
            <ul className="list-disc pl-6 mt-1">
              <li>Trend line analysis</li>
              <li>Price action patterns</li>
              <li>Volume profile analysis</li>
            </ul>
          </li>
        </ol>

        <h3 className="text-xl font-medium mb-2">Scenario Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <h4 className="font-medium text-green-400 mb-2">Bullish Scenario</h4>
            <ul className="list-disc pl-4 text-sm">
              <li>Strong support levels</li>
              <li>Increasing volume</li>
              <li>Higher highs pattern</li>
            </ul>
          </div>
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <h4 className="font-medium text-red-400 mb-2">Bearish Scenario</h4>
            <ul className="list-disc pl-4 text-sm">
              <li>Strong resistance levels</li>
              <li>Decreasing volume</li>
              <li>Lower lows pattern</li>
            </ul>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h4 className="font-medium text-blue-400 mb-2">Neutral Scenario</h4>
            <ul className="list-disc pl-4 text-sm">
              <li>Range-bound trading</li>
              <li>Stable volume</li>
              <li>Sideways movement</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};