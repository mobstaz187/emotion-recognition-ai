import React from 'react';

interface Props {
  onRefresh: () => void;
  lastUpdated: Date | null;
  isLoading: boolean;
}

export const TickerHeader: React.FC<Props> = ({ onRefresh, lastUpdated, isLoading }) => {
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    }).format(date);
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold">Top Tickers</h2>
        <p className="text-sm text-foreground/60 mt-1">Last 2 hours</p>
      </div>
      <div className="flex items-center gap-4">
        {lastUpdated && (
          <span className="text-sm text-foreground/60">
            Last updated: {formatTime(lastUpdated)}
          </span>
        )}
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className={`
            p-2 rounded-lg text-primary hover:bg-primary/10 
            transition-colors disabled:opacity-50
            ${isLoading ? 'animate-spin' : ''}
          `}
          title="Refresh data"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
            />
          </svg>
        </button>
      </div>
    </div>
  );
};