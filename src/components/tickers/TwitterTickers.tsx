import React from 'react';
import { useTwitterTickers } from '../../hooks/useTwitterTickers';
import { TickerItem } from './TickerItem';
import { TickerSkeleton } from './TickerSkeleton';
import { TickerHeader } from './TickerHeader';

export const TwitterTickers: React.FC = () => {
  const { tickers, isLoading, refresh, lastUpdated } = useTwitterTickers();

  if (isLoading && !tickers.length) {
    return <TickerSkeleton count={10} />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-black/30 dark:bg-gray-900/30 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
        <TickerHeader 
          onRefresh={refresh}
          lastUpdated={lastUpdated}
          isLoading={isLoading}
        />
        <div className="space-y-4">
          {tickers.map((ticker, index) => (
            <TickerItem
              key={ticker.symbol}
              rank={index + 1}
              symbol={ticker.symbol}
              mentions={ticker.mentions}
              change={ticker.change}
            />
          ))}
        </div>
      </div>
    </div>
  );
};