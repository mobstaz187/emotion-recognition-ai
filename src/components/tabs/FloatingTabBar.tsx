import React from 'react';
import { motion } from 'framer-motion';
import { useProfile } from '../../contexts/ProfileContext';
import { useTheme } from '../../contexts/ThemeContext';

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
  const { currentProfile } = useProfile();
  const { isDark } = useTheme();
  const activeColor = currentProfile?.color || '#3B82F6';

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className={`${isDark ? 'bg-card' : 'bg-card'} border border-border rounded-2xl p-2 shadow-lg`}>
        <div className="flex gap-2">
          {tabs.map((tab, index) => (
            <React.Fragment key={tab.id}>
              {index > 0 && (
                <div className="w-px h-8 my-auto bg-border" />
              )}
              <button
                onClick={() => onTabChange(tab.id)}
                className="relative group"
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-xl"
                    style={{
                      backgroundColor: `${activeColor}20`,
                      border: `1px solid ${activeColor}30`
                    }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <div className={`
                  relative z-10 px-4 py-2 rounded-xl flex items-center gap-2
                  transition-colors duration-200
                  ${activeTab === tab.id 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                  }
                `}
                style={activeTab === tab.id ? { color: activeColor } : undefined}>
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