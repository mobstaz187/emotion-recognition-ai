import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CopyButton } from '../common/CopyButton';
import { ThemeToggle } from '../theme/ThemeToggle';
import { useProfile } from '../../contexts/ProfileContext';

const PROFILES = [
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
          <div className="relative">
            <h1 className="text-4xl font-black tracking-normal bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] bg-clip-text text-transparent font-display">
              PELIOS
              <span className="absolute -top-1 -right-8 text-xs font-medium text-blue-400">
                Beta
              </span>
            </h1>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground font-medium">Contract:</span>
              <CopyButton text="ASDASDASDA" />
              <div className="border border-border rounded-lg">
                <a
                  href="https://x.com"
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
                  <span className="relative z-10 font-medium">{currentProfile.name}</span>
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
                        {PROFILES.map((profile) => (
                          <button
                            key={profile.id}
                            onClick={() => {
                              setCurrentProfile(profile);
                              setIsDropdownOpen(false);
                            }}
                            className="w-full px-4 py-3.5 text-left hover:bg-white/5 transition-colors flex items-center gap-2 relative"
                            style={{ color: profile.color }}
                          >
                            {currentProfile.id === profile.id && (
                              <motion.div
                                className="absolute inset-0"
                                style={{ 
                                  backgroundColor: `${profile.color}10`,
                                  borderLeft: `2px solid ${profile.color}`
                                }}
                                layoutId="activeProfileHighlight"
                              />
                            )}
                            <span className="relative z-10 text-xl">{profile.emoji}</span>
                            <span className="relative z-10 font-bold">{profile.name}</span>
                          </button>
                        ))}
                        
                        <div className="h-px bg-border mx-2 my-2" />
                        
                        <button
                          onClick={() => {
                            setCurrentProfile(null);
                            setIsDropdownOpen(false);
                          }}
                          className="w-full px-4 py-3.5 text-left text-foreground hover:bg-white/5 transition-colors font-bold flex items-center gap-2"
                        >
                          <svg 
                            className="w-4 h-4" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                          </svg>
                          <span>Splashscreen</span>
                        </button>
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