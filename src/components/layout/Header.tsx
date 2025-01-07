import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CopyButton } from '../common/CopyButton';
import { EmotionLogo } from '../logo/EmotionLogo';
import { ProfileDropdown } from '../profile/ProfileDropdown';
import { ThemeToggle } from '../theme/ThemeToggle';
import { useProfile } from '../../contexts/ProfileContext';
import { useTab } from '../../contexts/TabContext';

export const Header: React.FC = () => {
  const { currentProfile } = useProfile();
  const { activeTab, setActiveTab } = useTab();

  React.useEffect(() => {
    if (activeTab === 'surprised-chat' && currentProfile?.name !== 'Surprised') {
      setActiveTab('landing');
    }
  }, [activeTab, currentProfile, setActiveTab]);

  return (
    <motion.header
      layout
      className="bg-white/80 dark:bg-card/80 backdrop-blur-xl border-b border-border sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <EmotionLogo />
            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border border-blue-500/30">
              Beta
            </span>
          </div>

          {/* Right side - Contract, Social, Theme, Profile */}
          <div className="flex items-center gap-6">
            <AnimatePresence mode="wait">
              <motion.div
                key="contract"
                className="flex items-center gap-4"
                initial={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <span className="text-sm text-muted-foreground font-medium">Contract Address:</span>
                <CopyButton text="ASDASDASDA" />
                <motion.a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Follow on X (Twitter)"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </motion.a>
              </motion.div>
            </AnimatePresence>
            <ThemeToggle />
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </motion.header>
  );
};