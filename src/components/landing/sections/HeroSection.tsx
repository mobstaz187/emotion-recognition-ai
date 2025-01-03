import React from 'react';
import { motion } from 'framer-motion';

export const HeroSection = () => {
  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Emotion Recognition AI
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
          Advanced emotion detection powered by machine learning, providing real-time analysis for images and live video.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="px-8 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors">
            Get Started
          </button>
          <button className="px-8 py-3 bg-white/5 text-gray-300 rounded-xl hover:bg-white/10 transition-colors">
            View Demo
          </button>
        </div>
      </motion.div>
    </section>
  );
};