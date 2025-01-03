import React from 'react';

interface Tab {
  id: string;
  label: string;
  icon: string | React.ReactNode;
}

interface Props {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const TabBar: React.FC<Props> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            flex items-center justify-center gap-2 p-3 rounded-xl transition-all duration-300
            ${activeTab === tab.id
              ? 'bg-blue-500/20 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)] border border-blue-500/30'
              : 'bg-black/20 text-gray-400 hover:text-gray-200 hover:bg-black/30 border border-white/5'
            }
          `}
        >
          {typeof tab.icon === 'string' ? <span>{tab.icon}</span> : tab.icon}
          <span className="text-sm font-medium">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};