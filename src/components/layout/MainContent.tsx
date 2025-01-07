import React, { useState } from 'react';
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
  const { activeTab, setActiveTab } = useTab();

  const renderContent = () => {
    switch (activeTab) {
      case 'landing':
        return <LandingPage />;
      case 'upload':
        return <ImageUploadSection />;
      case 'docs':
        return <AlgorithmDocumentation />;
      case 'tickers':
        return <TwitterTickers />;
      case 'monitor':
        return <TokenMonitor />;
      case 'chart':
        return <ChartAnalysis />;
      case 'surprised-chat':
        return <SurprisedChat />;
      default:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <WebcamSection 
                isActive={isActive}
                onToggle={() => setIsActive(!isActive)}
              />
            </div>
            <div className="lg:col-span-1">
              <ResultsPanel />
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
        {renderContent()}
      </main>
      <FloatingTabBar
        tabs={BASE_TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </>
  );
};