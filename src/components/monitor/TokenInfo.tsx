import React from 'react';
import { TokenData } from '../../types/token';
import { formatNumber } from '../../utils/formatNumber';
import { TradingButtons } from './TradingButtons';
import { motion } from 'framer-motion';
import { useTab } from '../../contexts/TabContext';
import { useToken } from '../../contexts/TokenContext';

interface Props {
  data: TokenData;
  address: string;
}

export const TokenInfo: React.FC<Props> = ({ data, address }) => {
  const { setActiveTab } = useTab();
  const { setChartImage } = useToken();
  const formattedPrice = data.price < 0.0001 
    ? data.price.toFixed(12)
    : formatNumber(data.price);

  const handleAnalyzeChart = () => {
    // Just pass the iframe URL instead of trying to capture the image
    const chartUrl = `https://birdeye.so/tv-widget/${address}?chain=solana&viewMode=pair&chartInterval=1D&chartType=CANDLE&chartTimezone=Asia%2FSingapore&chartLeftToolbar=show&theme=dark`;
    setChartImage(chartUrl);
    setActiveTab('chart');
  };

  return (
    <div className="mt-4 space-y-4">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div className="bg-background rounded-lg p-4 border border-border">
          <h3 className="text-sm text-muted-foreground mb-1">Market Cap</h3>
          <p className="text-xl font-semibold text-foreground">
            ${formatNumber(data.marketCap)}
          </p>
        </div>
        
        <div className="bg-background rounded-lg p-4 border border-border">
          <h3 className="text-sm text-muted-foreground mb-1">Price</h3>
          <p className="text-xl font-semibold text-foreground">
            ${formattedPrice}
          </p>
        </div>
        
        <div className="bg-background rounded-lg p-4 border border-border">
          <h3 className="text-sm text-muted-foreground mb-1">24h Volume</h3>
          <p className="text-xl font-semibold text-foreground">
            ${formatNumber(data.volume24h)}
          </p>
        </div>
        
        <div className="bg-background rounded-lg p-4 border border-border">
          <h3 className="text-sm text-muted-foreground mb-1">Price Change 24h</h3>
          <p className={`text-xl font-semibold ${
            data.priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'
          }`}>
            {data.priceChange24h > 0 ? '+' : ''}{data.priceChange24h.toFixed(2)}%
          </p>
        </div>
      </motion.div>

      {/* Birdeye Chart */}
      <div className="space-y-4">
        <div className="w-full aspect-[16/9] rounded-lg border border-border overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            src={`https://birdeye.so/tv-widget/${address}?chain=solana&viewMode=pair&chartInterval=1D&chartType=CANDLE&chartTimezone=Asia%2FSingapore&chartLeftToolbar=show&theme=dark`}
            frameBorder="0"
            allowFullScreen
          />
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleAnalyzeChart}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Analyze Chart
          </button>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-background rounded-lg p-4 border border-border"
      >
        <h3 className="text-sm text-muted-foreground mb-3">Trading Platforms</h3>
        <TradingButtons address={address} />
      </motion.div>
    </div>
  );
};