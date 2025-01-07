import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface Props {
  onComplete: () => void;
}

export const SplashTransition: React.FC<Props> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50 overflow-hidden">
      <div className="relative w-[80px] h-[80px]">
        {/* Static Circle Container */}
        <div className="absolute inset-0">
          <svg width="80" height="80" viewBox="0 0 80 80">
            {/* Rotating Gradient Stroke */}
            <motion.g
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 2,
                ease: "linear",
                repeat: Infinity
              }}
              style={{ originX: "50%", originY: "50%" }}
            >
              <circle
                cx="40"
                cy="40"
                r="32"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="4"
                strokeDasharray="12,4"
                strokeLinecap="round"
              />
            </motion.g>

            {/* Drawing Effect Circle */}
            <motion.circle
              cx="40"
              cy="40"
              r="32"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0.5 }}
              animate={{ pathLength: 1, opacity: 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />

            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4F46E5" />
                <stop offset="100%" stopColor="#7C3AED" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Fade Out Overlay */}
      <motion.div
        className="fixed inset-0 bg-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 2 }}
      />
    </div>
  );
};