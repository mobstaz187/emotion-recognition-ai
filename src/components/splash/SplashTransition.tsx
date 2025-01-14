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
      <div className="relative flex flex-col items-center">
        {/* Loading Animation */}
        <div className="relative w-[80px] h-[80px] mb-8">
          {/* Static Circle Container */}
          <div className="absolute inset-0">
            <svg width="80" height="80" viewBox="0 0 80 80">
              {/* Rotating Gradient Stroke */}
              <defs>
                <linearGradient id="spinnerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4F46E5" />
                  <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
              </defs>
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
                  stroke="url(#spinnerGradient)"
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
                stroke="url(#spinnerGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0.5 }}
                animate={{ pathLength: 1, opacity: 0 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </svg>
          </div>
        </div>

        {/* PELIOS Text with Underline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative flex flex-col items-center"
        >
          <h1 
            className="text-[40px] bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] bg-clip-text text-transparent"
            style={{ 
              fontFamily: "'Orbitron', sans-serif",
              letterSpacing: '0.1em',
              fontWeight: 900,
            }}
          >
            PELIOS
          </h1>
          <motion.div 
            className="h-[2px] w-full mt-2 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] opacity-50"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          />
        </motion.div>
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