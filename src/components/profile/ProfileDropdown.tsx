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
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors hover:bg-white/5"
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">{currentProfile.emoji}</span>
          <span className="text-sm font-medium text-foreground">
            {currentProfile.name}
          </span>
        </div>
        <motion.svg
          className="w-4 h-4 text-foreground/60"
          viewBox="0 0 20 20"
          fill="currentColor"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </motion.svg>
      </button>

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
              className="absolute right-0 mt-2 w-48 rounded-xl bg-white/80 dark:bg-card/80 backdrop-blur-xl border border-border shadow-lg z-50"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-2 space-y-1">
                {PROFILES.map((profile) => (
                  <button
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
                  >
                    <span className="text-xl">{profile.emoji}</span>
                    <span className="text-sm font-medium">{profile.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};