import React, { createContext, useContext, useState } from 'react';

interface TabContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

// Export the hook separately from the provider
export function useTab() {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTab must be used within a TabProvider');
  }
  return context;
}

// Export the provider component
export function TabProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState('landing');

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
}