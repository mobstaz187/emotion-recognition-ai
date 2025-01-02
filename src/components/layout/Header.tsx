import React from 'react';
import { ThemeToggle } from '../ThemeToggle';
import { CopyButton } from '../common/CopyButton';
import { EmotionLogo } from '../logo/EmotionLogo';
import { ProfileAvatar } from '../profile/ProfileAvatar';
import { useProfile } from '../../contexts/ProfileContext';
import { useTab } from '../../contexts/TabContext';
import { TabBar } from '../tabs/TabBar';

const BASE_TABS = [
  { id: 'live', label: 'Realtime Emotion Analysis', icon: '📹' },
  { id: 'upload', label: 'Upload Image', icon: '🖼️' },
  { id: 'monitor', label: 'Token Analysis', icon: '📊' },
  { id: 'tickers', label: 'Popular Tokens Tickers', icon: '𝕏' },
  { id: 'docs', label: 'Documentation', icon: '📚' },
];

const SURPRISED_TAB = { 
  id: 'surprised-chat', 
  label: 'Talk to me I\'m surprised', 
  icon: '😮' 
};

export const Header: React.FC = () => {
  const { currentProfile, setCurrentProfile } = useProfile();
  const { activeTab, setActiveTab } = useTab();

  // Get tabs based on current profile
  const tabs = React.useMemo(() => {
    if (currentProfile?.name === 'Surprised') {
      return [...BASE_TABS, SURPRISED_TAB];
    }
    return BASE_TABS;
  }, [currentProfile]);

  // If current tab is surprised-chat but profile is not surprised,
  // switch to live tab
  React.useEffect(() => {
    if (activeTab === 'surprised-chat' && currentProfile?.name !== 'Surprised') {
      setActiveTab('live');
    }
  }, [activeTab, currentProfile, setActiveTab]);

  return (
    <header className="bg-black/30 dark:bg-gray-900/30 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <EmotionLogo />
            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border border-blue-500/30">
              Beta
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Contract Address:</span>
              <CopyButton text="ASDASDASDA" />
            </div>
            <ThemeToggle />
            {currentProfile && (
              <ProfileAvatar
                profile={currentProfile}
                size="sm"
                onClick={() => setCurrentProfile(null)}
              />
            )}
          </div>
        </div>
        <TabBar
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
    </header>
  );
};