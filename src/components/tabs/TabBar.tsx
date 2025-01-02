import React from 'react';

interface Tab {
  id: string;
  label: string;
  icon?: string;
}

interface Props {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const TabBar: React.FC<Props> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex space-x-1 p-1 bg-black/20 dark:bg-gray-800/30 rounded-2xl backdrop-blur-lg border border-white/10">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300
            ${activeTab === tab.id
              ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)] border border-blue-500/30'
              : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
            }
          `}
        >
          {tab.icon && <span>{tab.icon}</span>}
          {tab.label}
        </button>
      ))}
    </div>
  );
};