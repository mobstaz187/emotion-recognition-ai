import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Profile, useProfile } from '../../contexts/ProfileContext';

const PROFILES: Profile[] = [
  { id: '1', name: 'Happy', color: '#D97706', emoji: '😊' },
  { id: '2', name: 'Sad', color: '#3B82F6', emoji: '😢' },
  { id: '3', name: 'Angry', color: '#EF4444', emoji: '😠' },
  { id: '4', name: 'Fearful', color: '#8B5CF6', emoji: '😨' },
  { id: '5', name: 'Disgusted', color: '#10B981', emoji: '🤢' },
  { id: '6', name: 'Surprised', color: '#EC4899', emoji: '😮' },
];

export const ProfileDropdown: React.FC = () => {
  const { currentProfile, setCurrentProfile } = useProfile();
  const [isOpen, setIsOpen] = useState(false);

  if (!currentProfile) return null;

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors hover:bg-white/5"
        layout
      >
        <motion.div 
          className="flex items-center gap-2"
          layout
        >
          <motion.span 
            className="text-2xl transform origin-center"
            initial={{ scale: 1 }}
            animate={{ 
              scale: isOpen ? 1.2 : 1,
              rotate: isOpen ? [0, -10, 10, -10, 0] : 0
            }}
            transition={{ 
              scale: { duration: 0.2 },
              rotate: { duration: 0.4, times: [0, 0.2, 0.4, 0.6, 0.8] }
            }}
          >
            {currentProfile.emoji}
          </motion.span>
          <motion.span 
            className="text-sm font-medium text-foreground"
            layout
          >
            {currentProfile.name}
          </motion.span>
        </motion.div>
        <motion.svg
          className="w-4 h-4 text-foreground/60"
          viewBox="0 0 20 20"
          fill="currentColor"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="absolute right-0 mt-2 w-48 rounded-xl bg-white/80 dark:bg-card/80 backdrop-blur-xl border border-border shadow-lg z-50 overflow-hidden"
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-2 space-y-1">
                {PROFILES.map((profile, index) => (
                  <motion.button
                    key={profile.id}
                    onClick={() => {
                      setCurrentProfile(profile);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors
                      ${currentProfile.id === profile.id 
                        ? 'bg-primary/10 text-primary' 
                        : 'hover:bg-white/5 text-foreground'}`}
                    style={{
                      '--tw-text-opacity': 1,
                      color: currentProfile.id === profile.id ? profile.color : undefined
                    } as React.CSSProperties}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 4 }}
                  >
                    <span className="text-xl">{profile.emoji}</span>
                    <span className="text-sm font-medium">{profile.name}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};