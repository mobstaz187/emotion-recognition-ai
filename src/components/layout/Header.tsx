import React from 'react';
import { ThemeToggle } from '../ThemeToggle';
import { CopyButton } from '../common/CopyButton';
import { EmotionLogo } from '../logo/EmotionLogo';
import { ProfileAvatar } from '../profile/ProfileAvatar';
import { useProfile } from '../../contexts/ProfileContext';
import { useTab } from '../../contexts/TabContext';
import { TabBar } from '../tabs/TabBar';

const TABS = [
  { id: 'live', label: 'Live Analysis', icon: '📹' },
  { id: 'upload', label: 'Upload Image', icon: '🖼️' },
  { id: 'docs', label: 'Documentation', icon: '📚' }
];

export const Header: React.FC = () => {
  const { currentProfile, setCurrentProfile } = useProfile();
  const { activeTab, setActiveTab } = useTab();

  return (
    <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <EmotionLogo />
            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              Beta
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Contract Address:</span>
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
          tabs={TABS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
    </header>
  );
};