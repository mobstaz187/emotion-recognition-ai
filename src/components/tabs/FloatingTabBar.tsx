import React from 'react';
import { motion } from 'framer-motion';

interface Tab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }> | string;
}

interface Props {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const FloatingTabBar: React.FC<Props> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        <div className="flex gap-2">
          {tabs.map((tab, index) => (
            <React.Fragment key={tab.id}>
              {index > 0 && (
                <div className="w-px h-8 my-auto bg-white/10" />
              )}
              <button
                onClick={() => onTabChange(tab.id)}
                className="relative group"
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-blue-500/20 border border-blue-500/30 rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <div className={`
                  relative z-10 px-4 py-2 rounded-xl flex items-center gap-2
                  transition-colors duration-200
                  ${activeTab === tab.id 
                    ? 'text-blue-400' 
                    : 'text-gray-400 hover:text-gray-300'
                  }
                `}>
                  {typeof tab.icon === 'string' ? (
                    <span className="text-lg">{tab.icon}</span>
                  ) : (
                    <tab.icon className="w-5 h-5" />
                  )}
                  <span className="text-sm font-medium whitespace-nowrap">{tab.label}</span>
                </div>
              </button>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};