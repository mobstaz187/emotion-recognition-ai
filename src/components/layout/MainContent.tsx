import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WebcamSection } from '../sections/WebcamSection';
import { ResultsPanel } from '../sections/ResultsPanel';
import { ImageUploadSection } from '../upload/ImageUploadSection';
import { AlgorithmDocumentation } from '../docs/AlgorithmDocumentation';
import { SurprisedChat } from '../chat/SurprisedChat';
import { TwitterTickers } from '../tickers/TwitterTickers';
import { TokenMonitor } from '../monitor/TokenMonitor';
import { ChartAnalysis } from '../chart/ChartAnalysis';
import { useTab } from '../../contexts/TabContext';
import { FloatingTabBar } from '../tabs/FloatingTabBar';
import { BASE_TABS } from '../../constants/tabs';
import { LandingPage } from '../landing/LandingPage';

interface Props {
  showChartInstructions: boolean;
  setShowChartInstructions: (show: boolean) => void;
  showTokenInstructions: boolean;
  setShowTokenInstructions: (show: boolean) => void;
}

export const MainContent: React.FC<Props> = ({ 
  showChartInstructions, 
  setShowChartInstructions,
  showTokenInstructions,
  setShowTokenInstructions
}) => {
  const [isActive, setIsActive] = useState(false);
  const [isProcessing] = useState(false);
  const { activeTab, setActiveTab } = useTab();
  const [previousTab, setPreviousTab] = useState('landing');

  const getDirection = (current: string, previous: string) => {
    const currentIndex = BASE_TABS.findIndex(tab => tab.id === current);
    const previousIndex = BASE_TABS.findIndex(tab => tab.id === previous);
    if (previous === 'landing') return 1;
    if (current === 'landing') return -1;
    return currentIndex > previousIndex ? 1 : -1;
  };

  const handleTabChange = (newTab: string) => {
    setPreviousTab(activeTab);
    setActiveTab(newTab);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '20%' : '-20%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '20%' : '-20%',
      opacity: 0
    })
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'landing':
        return <LandingPage />;
      case 'live':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <WebcamSection 
                isActive={isActive}
                onToggle={() => setIsActive(!isActive)}
                isProcessing={isProcessing}
              />
            </div>
            <div className="lg:col-span-1">
              <ResultsPanel />
            </div>
          </div>
        );
      case 'upload':
        return <ImageUploadSection />;
      case 'docs':
        return <AlgorithmDocumentation />;
      case 'tickers':
        return <TwitterTickers />;
      case 'monitor':
        return <TokenMonitor setShowTokenInstructions={setShowTokenInstructions} />;
      case 'chart':
        return <ChartAnalysis setShowChartInstructions={setShowChartInstructions} />;
      case 'surprised-chat':
        return <SurprisedChat />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8 relative overflow-x-hidden">
        <AnimatePresence mode="wait" custom={getDirection(activeTab, previousTab)}>
          <motion.div
            key={activeTab}
            custom={getDirection(activeTab, previousTab)}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.15,
              ease: "easeOut"
            }}
            className="w-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <FloatingTabBar
        tabs={BASE_TABS}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* Chart Instructions Overlay */}
      <AnimatePresence>
        {showChartInstructions && (
          <motion.div
            key="chart-instructions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-xl border border-border p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-foreground mb-4">Welcome</h3>
                  <p className="text-muted-foreground mb-6">
                    Our advanced AI detects support and resistance levels in your charts, helping you identify key price levels and potential trading opportunities.
                  </p>
                </div>

                <div>
                  <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                    <p className="text-sm text-foreground">
                      For more clear and precise analysis, we recommend users to upload a 1600x600 and up resolution images. Make sure that only the chart is visible and other indicators like volume, RSI, MACD are not present in the image. See image for reference.
                    </p>
                  </div>

                  <div className="relative aspect-video rounded-lg border border-border overflow-hidden mt-4">
                    <img 
                      src="/BTC-Sample.png" 
                      alt="Sample Chart" 
                      className="w-full h-full object-contain bg-black/20"
                    />
                  </div>

                  <h4 className="text-xl font-semibold text-foreground mb-4 mt-8">How to Use:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <ol className="list-decimal list-inside space-y-3 text-foreground">
                        <li>Upload your chart image</li>
                        <li>Adjust color detection settings if needed</li>
                        <li>Select market scenario (bullish/bearish/neutral)</li>
                        <li>View detected support and resistance levels</li>
                      </ol>
                    </div>
                    <div className="relative aspect-video rounded-lg border border-border overflow-hidden">
                      <img 
                        src="./Chart-Analysis.gif" 
                        alt="Chart Analysis Demo" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mt-8">
                  <button
                    onClick={() => setShowChartInstructions(false)}
                    className="px-6 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Got it!
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Token Sentiment Instructions Overlay */}
      <AnimatePresence>
        {showTokenInstructions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-xl border border-border p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-foreground mb-4">Welcome to Token Sentiment Analysis</h3>
                  <p className="text-muted-foreground mb-6">
                    Our advanced AI analyzes token sentiment across multiple timeframes, providing comprehensive market insights 
                    and technical analysis to help you make informed trading decisions.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-foreground mb-4">How to Use:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <ol className="list-decimal list-inside space-y-3 text-foreground">
                        <li>Paste the token contract address.</li>
                        <li>Click Analyze to start sentiment analysis.</li>
                        <li>View technical indicators and market metrics.</li>
                        <li>Check timeframe analysis for different periods.</li>
                      </ol>
                    </div>
                    <div className="relative aspect-video rounded-lg border border-border overflow-hidden">
                      <img 
                        src="./Token-Sentiment.gif" 
                        alt="Token Analysis Demo" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mt-8">
                  <button
                    onClick={() => setShowTokenInstructions(false)}
                    className="px-6 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Got it!
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};