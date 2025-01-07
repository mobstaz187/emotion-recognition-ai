import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProfileAvatar } from './ProfileAvatar';
import { useProfile } from '../../contexts/ProfileContext';
import { ThemeToggle } from '../theme/ThemeToggle';
import type { Profile } from '../../contexts/ProfileContext';
import { SocialLinks } from '../common/SocialLinks';

const PROFILES: Profile[] = [
  { id: '1', name: 'Happy', color: '#D97706', emoji: '😊' },
  { id: '2', name: 'Sad', color: '#3B82F6', emoji: '😢' },
  { id: '3', name: 'Angry', color: '#EF4444', emoji: '😠' },
  { id: '4', name: 'Fearful', color: '#8B5CF6', emoji: '😨' },
  { id: '5', name: 'Disgusted', color: '#10B981', emoji: '🤢' },
  { id: '6', name: 'Surprised', color: '#EC4899', emoji: '😮' },
];

export const ProfileSelection: React.FC = () => {
  const { currentProfile, setCurrentProfile } = useProfile();

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        className="fixed inset-0 bg-background flex flex-col items-center justify-center px-4 z-50"
        initial={{ opacity: 1 }}
        exit={{ 
          opacity: 0,
          transition: {
            duration: 0.3,
            ease: "easeInOut"
          }
        }}
      >
        <motion.div 
          className="absolute top-6 right-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ThemeToggle />
        </motion.div>
        
        <motion.div 
          className="flex items-center gap-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.img 
            src="/pill-icon.png" 
            alt="Pill Icon" 
            className="w-16 h-16 object-contain"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.4
            }}
          />
          <div className="text-center">
            <motion.h1 
              className="text-6xl font-bold font-display"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              style={{
                background: currentProfile 
                  ? `-webkit-linear-gradient(${currentProfile.color}, ${currentProfile.color}80)`
                  : '-webkit-linear-gradient(45deg, #3B82F6, #8B5CF6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              PELIOS
            </motion.h1>
            <motion.div 
              className="h-px w-full my-3"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6 }}
              style={{
                background: currentProfile
                  ? `linear-gradient(to right, transparent, ${currentProfile.color}40, transparent)`
                  : 'linear-gradient(to right, transparent, rgb(var(--border)), transparent)'
              }}
            />
            <motion.p 
              className="text-xl text-muted-foreground font-display"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              Choose Your Avatar
            </motion.p>
          </div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-3xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          {PROFILES.map((profile, index) => (
            <motion.div 
              key={profile.id} 
              className="flex flex-col items-center gap-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentProfile(profile)}
            >
              <ProfileAvatar
                profile={profile}
                size="lg"
                onClick={() => setCurrentProfile(profile)}
              />
              <span 
                className="text-lg transition-colors duration-200"
                style={{ 
                  color: profile.id === currentProfile?.id 
                    ? profile.color 
                    : 'rgb(var(--muted-foreground))'
                }}
              >
                {profile.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          className="fixed bottom-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <SocialLinks />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};