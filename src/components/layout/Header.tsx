import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CopyButton } from '../common/CopyButton';
import { EmotionLogo } from '../logo/EmotionLogo';
import { ProfileDropdown } from '../profile/ProfileDropdown';
import { ThemeToggle } from '../theme/ThemeToggle';
import { useProfile } from '../../contexts/ProfileContext';
import { useTab } from '../../contexts/TabContext';
import { useTheme } from '../../contexts/ThemeContext';

export const Header: React.FC = () => {
  const { currentProfile } = useProfile();
  const { activeTab, setActiveTab } = useTab();
  const { isDark } = useTheme();

  React.useEffect(() => {
    if (activeTab === 'surprised-chat' && currentProfile?.name !== 'Surprised') {
      setActiveTab('landing');
    }
  }, [activeTab, currentProfile, setActiveTab]);

  return (
    <motion.header
      className="bg-white/80 dark:bg-card/80 backdrop-blur-xl border-b border-border sticky top-0 z-50"
      initial={false}
      animate={{ height: 'auto' }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <motion.div 
          className="flex justify-end items-center gap-4"
          layout
          transition={{
            layout: { duration: 0.3 }
          }}
        >
          {/* Logo - Now on the left */}
          <motion.div 
            className="flex items-center gap-2 mr-auto"
            layout
          >
            <EmotionLogo />
          </motion.div>

          {/* Contract Address - Compact version */}
          <motion.div 
            className="flex items-center gap-2"
            layout
          >
            <motion.span 
              className="text-sm text-muted-foreground font-medium whitespace-nowrap"
              layout
            >
              Contract:
            </motion.span>
            <motion.div layout>
              <CopyButton text="ASDASDASDA" />
            </motion.div>
          </motion.div>

          {/* X Logo */}
          <motion.a
            layout
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center w-8 h-8 rounded-lg border border-border
              ${isDark 
                ? 'hover:bg-white/10' 
                : 'hover:bg-black/10'
              } transition-colors`}
            aria-label="Follow on X (Twitter)"
          >
            <svg className="w-4 h-4 text-foreground" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </motion.a>
          
          {/* Theme toggle and profile */}
          <motion.div 
            className="flex items-center gap-4"
            layout
          >
            <ThemeToggle />
            <ProfileDropdown />
          </motion.div>
        </motion.div>
      </div>
    </motion.header>
  );
};