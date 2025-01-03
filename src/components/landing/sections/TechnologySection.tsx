import React from 'react';
import { motion } from 'framer-motion';

export const TechnologySection = () => {
  return (
    <section className="py-32 bg-black/30">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-16 text-center">
            Powered by Advanced Technology
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-4 text-blue-400">TensorFlow.js</h3>
              <p className="text-gray-400 text-lg">
                Real-time emotion detection using deep learning models optimized for browser performance.
              </p>
            </div>
            <div className="backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-4 text-green-400">Face-API</h3>
              <p className="text-gray-400 text-lg">
                State-of-the-art facial detection and expression recognition algorithms.
              </p>
            </div>
            <div className="backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-4 text-purple-400">React + Vite</h3>
              <p className="text-gray-400 text-lg">
                Modern web technologies ensuring smooth and responsive user experience.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};