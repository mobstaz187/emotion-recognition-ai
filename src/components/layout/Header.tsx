import React from 'react';
import { CopyButton } from '../common/CopyButton';
import { EmotionLogo } from '../logo/EmotionLogo';
import { ProfileAvatar } from '../profile/ProfileAvatar';
import { useProfile } from '../../contexts/ProfileContext';
import { useTab } from '../../contexts/TabContext';

export const Header: React.FC = () => {
  const { currentProfile, setCurrentProfile } = useProfile();
  const { activeTab, setActiveTab } = useTab();

  React.useEffect(() => {
    if (activeTab === 'surprised-chat' && currentProfile?.name !== 'Surprised') {
      setActiveTab('landing');
    }
  }, [activeTab, currentProfile, setActiveTab]);

  return (
    <header className="bg-black/30 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <EmotionLogo />
            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border border-blue-500/30">
              Beta
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center gap-4">
              <span className="text-sm text-foreground/60">Contract Address:</span>
              <CopyButton text="ASDASDASDA" />
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-foreground/60 hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label="Follow on X (Twitter)"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
            {currentProfile && (
              <ProfileAvatar
                profile={currentProfile}
                size="sm"
                onClick={() => setCurrentProfile(null)}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};