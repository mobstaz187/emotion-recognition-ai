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
        <AnimatePresence
          mode="wait"
          custom={getDirection(activeTab, previousTab)}
          initial={false}
        >
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
    </>
  );
};