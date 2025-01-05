import React from 'react';
import { motion } from 'framer-motion';

interface ToggleProps {
  checked: boolean;
  onChange: () => void;
}

export const Toggle: React.FC<ToggleProps> = ({ checked, onChange }) => {
  return (
    <button
      onClick={onChange}
      className={`
        relative w-12 h-7 rounded-full p-1 transition-colors duration-200
        ${checked ? 'bg-primary' : 'bg-muted'}
      `}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          x: checked ? '20px' : '0px'
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
        className="w-5 h-5 rounded-full bg-white shadow-sm"
      />
    </button>
  );
};