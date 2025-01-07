import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfile } from '../../contexts/ProfileContext';

export const SplashScreen: React.FC = () => {
  const { hasSeenSplash } = useProfile();

  // Don't render if user has already seen splash
  if (hasSeenSplash) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="splash"
        className="fixed inset-0 bg-background z-50 flex items-center justify-center"
        initial={{ opacity: 1 }}
        exit={{
          opacity: 0,
          scale: 1.2,
          filter: 'brightness(2)',
          transition: {
            duration: 0.8,
            ease: [0.645, 0.045, 0.355, 1]
          }
        }}
      >
        <motion.div
          className="relative flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            ease: [0, 0.71, 0.2, 1.01]
          }}
        >
          {/* Logo Container */}
          <motion.div 
            className="relative mb-8"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              times: [0, 0.5, 1],
              repeat: Infinity
            }}
          >
            <img 
              src="/pill-icon.png" 
              alt="Pill Icon" 
              className="w-24 h-24 object-contain"
            />
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/10 blur-xl rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                times: [0, 0.5, 1],
                repeat: Infinity
              }}
            />
          </motion.div>

          {/* Text Container */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.h1 
              className="text-6xl font-bold font-display bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{
                duration: 5,
                ease: "easeInOut",
                repeat: Infinity
              }}
              style={{
                backgroundSize: '200% 200%'
              }}
            >
              PELIOS
            </motion.h1>
            <motion.div 
              className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent my-3"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5 }}
            />
            <motion.p 
              className="text-xl text-muted-foreground font-display"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              AI-Powered Analysis
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};