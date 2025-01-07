import React, { useCallback } from 'react';
import { useTimeframeAnalysis } from '../../../hooks/useTimeframeAnalysis';
import { TimeframeMetrics } from './timeframes/TimeframeMetrics';
import { TimeframeActivity } from './timeframes/TimeframeActivity';
import { TimeframeTrades } from './timeframes/TimeframeTrades';
import { useProfile } from '../../../contexts/ProfileContext';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  address: string;
}

export const TimeframeAnalysis: React.FC<Props> = ({ address }) => {
  const { analysis, isLoading, fetchData } = useTimeframeAnalysis(address);
  const { currentProfile } = useProfile();
  const buttonColor = currentProfile?.color || '#3B82F6';

  const handleRefresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  const timeframes = [
    { key: 'm1', label: '1 Minute', data: analysis.m1 },
    { key: 'm15', label: '15 Minutes', data: analysis.m15 },
    { key: 'm30', label: '30 Minutes', data: analysis.m30 },
    { key: 'h1', label: '1 Hour', data: analysis.h1 },
    { key: 'h4', label: '4 Hours', data: analysis.h4 },
    { key: 'h24', label: '24 Hours', data: analysis.h24 }
  ];

  return (
    <motion.div 
      className="bg-white/80 dark:bg-card/80 backdrop-blur-xl rounded-xl border border-border p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-foreground">Market Analysis</h3>
        <motion.button
          onClick={handleRefresh}
          className="p-2 rounded-lg hover:bg-background transition-colors"
          style={{ color: buttonColor }}
          title="Refresh data"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
        >
          <motion.svg 
            className="w-5 h-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            animate={{ rotate: isLoading ? 360 : 0 }}
            transition={{ duration: 1, repeat: isLoading ? Infinity : 0, ease: "linear" }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
            />
          </motion.svg>
        </motion.button>
      </div>
      
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="h-[140px] flex items-center justify-center"
          >
            <div className="animate-pulse" style={{ color: buttonColor }}>
              Loading timeframe analysis...
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {timeframes.map(({ key, label, data }, index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-background rounded-lg border border-border p-4"
              >
                <h4 className="text-lg font-medium text-foreground mb-4">{label}</h4>
                <div className="space-y-4">
                  <TimeframeMetrics data={data} />
                  <TimeframeTrades data={data} minutes={parseInt(key.replace(/[mh]/, ''))} />
                  <TimeframeActivity signals={data.signals} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};