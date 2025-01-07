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

export const MainContent: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const { activeTab, setActiveTab, previousTab } = useTab();

  // Get tab indices for direction calculation
  const getTabIndex = (tabId: string) => BASE_TABS.findIndex(tab => tab.id === tabId);
  const currentIndex = getTabIndex(activeTab);
  const previousIndex = getTabIndex(previousTab);
  
  // Calculate slide direction based on tab indices
  const slideDirection = currentIndex > previousIndex ? 1 : -1;

  const variants = {
    enter: (direction: number) => ({
      x: direction * 30, // Reduced slide distance
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction * -30, // Reduced slide distance
      opacity: 0
    })
  };

  const renderContent = () => {
    return (
      <AnimatePresence
        mode="wait"
        initial={false}
        custom={slideDirection}
      >
        <motion.div
          key={activeTab}
          custom={slideDirection}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 500, damping: 25 }, // Increased stiffness, reduced damping
            opacity: { duration: 0.1 } // Faster opacity transition
          }}
          className="w-full absolute"
        >
          {activeTab === 'landing' ? (
            <LandingPage />
          ) : activeTab === 'live' ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <WebcamSection 
                  isActive={isActive}
                  onToggle={() => setIsActive(!isActive)}
                  isProcessing={false}
                />
              </div>
              <div className="lg:col-span-1">
                <ResultsPanel />
              </div>
            </div>
          ) : activeTab === 'upload' ? (
            <ImageUploadSection />
          ) : activeTab === 'docs' ? (
            <AlgorithmDocumentation />
          ) : activeTab === 'tickers' ? (
            <TwitterTickers />
          ) : activeTab === 'monitor' ? (
            <TokenMonitor />
          ) : activeTab === 'chart' ? (
            <ChartAnalysis />
          ) : activeTab === 'surprised-chat' ? (
            <SurprisedChat />
          ) : null}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <>
      <main className="min-h-screen px-4 sm:px-6 lg:px-8 py-8 pb-24">
        <div className="max-w-7xl mx-auto relative" style={{ minHeight: 'calc(100vh - 16rem)' }}>
          {renderContent()}
        </div>
      </main>
      <FloatingTabBar
        tabs={BASE_TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </>
  );
};