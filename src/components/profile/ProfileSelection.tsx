import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ProfileAvatar } from './ProfileAvatar';
import { useProfile } from '../../contexts/ProfileContext';
import { ThemeToggle } from '../theme/ThemeToggle';
import { SocialLinks } from '../common/SocialLinks';
import { SplashTransition } from '../splash/SplashTransition';
import type { Profile } from '../../contexts/ProfileContext';

const PROFILES: Profile[] = [
  { id: '1', name: 'Happy', color: '#D97706', emoji: '😊' },
  { id: '2', name: 'Sad', color: '#3B82F6', emoji: '😢' },
  { id: '3', name: 'Angry', color: '#EF4444', emoji: '😠' },
  { id: '4', name: 'Fearful', color: '#8B5CF6', emoji: '😨' },
  { id: '5', name: 'Disgusted', color: '#10B981', emoji: '🤢' },
  { id: '6', name: 'Surprised', color: '#EC4899', emoji: '😮' },
];

export const ProfileSelection: React.FC = () => {
  const { setCurrentProfile } = useProfile();
  const [showSplash, setShowSplash] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  const handleProfileSelect = (profile: Profile) => {
    setSelectedProfile(profile);
    setShowSplash(true);
  };

  const handleSplashComplete = () => {
    if (selectedProfile) {
      setCurrentProfile(selectedProfile);
    }
  };

  if (showSplash && selectedProfile) {
    return <SplashTransition onComplete={handleSplashComplete} />;
  }

  return (
    <motion.div 
      className="min-h-screen bg-background flex flex-col items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
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
        className="flex items-center gap-4 mb-12 -ml-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <motion.img 
          src="/Untitled-1.png" 
          alt="Pelios Logo" 
          className="w-32 h-32 object-contain"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.5
          }}
        />
        <div className="text-center">
          <motion.h1 
            className="text-6xl font-bold font-display bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            PELIOS
          </motion.h1>
          <motion.div 
            className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent my-2"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5 }}
          />
          <motion.p 
            className="text-xl text-muted-foreground font-display"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Choose Your Avatar
          </motion.p>
        </div>
      </motion.div>

      <motion.div 
        className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-3xl"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.7
            }
          }
        }}
        initial="hidden"
        animate="show"
      >
        {PROFILES.map((profile, index) => (
          <motion.div
            key={profile.id}
            className="flex flex-col items-center gap-4"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 }
            }}
          >
            <motion.div
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <ProfileAvatar
                profile={profile}
                size="lg"
                onClick={() => handleProfileSelect(profile)}
              />
            </motion.div>
            <motion.span 
              className="text-muted-foreground text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              {profile.name}
            </motion.span>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="fixed bottom-6 right-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <a
          href="https://x.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 flex items-center justify-center rounded-full 
            bg-black/30 backdrop-blur-xl border border-white/10 
            hover:bg-black/50 transition-colors"
          aria-label="X (Twitter)"
        >
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>
      </motion.div>
    </motion.div>
  );
};