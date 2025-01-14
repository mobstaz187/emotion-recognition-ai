import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CopyButton } from '../common/CopyButton';
import { ThemeToggle } from '../theme/ThemeToggle';
import { useProfile } from '../../contexts/ProfileContext';

const EMOTIONS = [
  { id: '1', name: 'Happy', color: '#D97706', emoji: '😊' },
  { id: '2', name: 'Sad', color: '#3B82F6', emoji: '😢' },
  { id: '3', name: 'Angry', color: '#EF4444', emoji: '😠' },
  { id: '4', name: 'Fearful', color: '#8B5CF6', emoji: '😨' },
  { id: '5', name: 'Disgusted', color: '#10B981', emoji: '🤢' },
  { id: '6', name: 'Surprised', color: '#EC4899', emoji: '😮' },
];

export const Header: React.FC = () => {
  const { currentProfile, setCurrentProfile } = useProfile();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="bg-card/80 backdrop-blur-xl border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center gap-0">
            <img 
              src="./Untitled-1.png" 
              alt="Pelios Logo" 
              className="w-10 h-10 md:w-14 md:h-14 object-contain"
            />
            <div className="flex items-end -ml-2">
              <h1 className="text-2xl md:text-4xl font-black tracking-normal bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] bg-clip-text text-transparent font-display">
                PELIOS
                <span className="text-xs font-medium text-blue-400 ml-1 mb-1">
                  Beta
                </span>
              </h1>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2 md:space-x-6">
            {/* Contract Info - Desktop Only */}
            <div className="hidden md:flex items-center gap-4">
              <span className="text-sm text-muted-foreground font-medium">Contract:</span>
              <CopyButton text="Updating..." />
            </div>

            {/* X Button - Show on both mobile and desktop */}
            <div className="border border-border rounded-lg">
              <a
                href="https://x.com/peliosgg"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors block"
                aria-label="Follow on X (Twitter)"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>

            <ThemeToggle />

            {/* Profile Selector */}
            {currentProfile && (
              <div className="relative">
                <motion.button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors relative"
                  style={{ color: currentProfile.color }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Box outline */}
                  <motion.div
                    className="absolute inset-0 rounded-lg"
                    style={{ 
                      border: `1px solid ${currentProfile.color}40`,
                      backgroundColor: `${currentProfile.color}10`
                    }}
                    layoutId="profileBox"
                  />
                  
                  {/* Content */}
                  <span className="relative z-10 text-2xl">{currentProfile.emoji}</span>
                  <span className="relative z-10 font-medium hidden md:block">{currentProfile.name}</span>
                  <svg 
                    className={`relative z-10 w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-56 bg-white/80 dark:bg-card/80 backdrop-blur-xl border border-border rounded-lg shadow-lg overflow-hidden"
                    >
                      <div className="py-2">
                        {EMOTIONS.map((emotion) => (
                          <motion.button
                            key={emotion.id}
                            onClick={() => {
                              setCurrentProfile(emotion);
                              setIsDropdownOpen(false);
                            }}
                            className="w-full px-4 py-2 flex items-center gap-3 hover:bg-white/5 transition-colors"
                            whileHover={{ x: 4 }}
                          >
                            <span className="text-2xl">{emotion.emoji}</span>
                            <span 
                              className="font-medium"
                              style={{ color: emotion.color }}
                            >
                              {emotion.name}
                            </span>
                          </motion.button>
                        ))}
                        <div className="h-px bg-border my-2" />
                        <motion.button
                          onClick={() => {
                            setCurrentProfile(null);
                            setIsDropdownOpen(false);
                          }}
                          className="w-full px-4 py-2 flex items-center gap-3 hover:bg-white/5 transition-colors text-red-400"
                          whileHover={{ x: 4 }}
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          <span className="font-medium">Reset Profile</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};