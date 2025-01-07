import React, { createContext, useContext, useState } from 'react';

interface TabContextType {
  activeTab: string;
  previousTab: string;
  setActiveTab: (tab: string) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export function useTab() {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTab must be used within a TabProvider');
  }
  return context;
}

export function TabProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState('landing');
  const [previousTab, setPreviousTab] = useState('landing');

  const handleTabChange = (tab: string) => {
    setPreviousTab(activeTab);
    setActiveTab(tab);
  };

  return (
    <TabContext.Provider value={{ 
      activeTab, 
      previousTab,
      setActiveTab: handleTabChange 
    }}>
      {children}
    </TabContext.Provider>
  );
}