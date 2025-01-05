import { motion } from 'framer-motion';

export const TechnologySection = () => {
  const technologies = [
    {
      name: 'TensorFlow.js',
      description: 'Real-time emotion detection using deep learning models optimized for browser performance.',
      icon: '🧠',
      color: 'from-blue-500/20 to-blue-600/20'
    },
    {
      name: 'Face-API',
      description: 'State-of-the-art facial detection and expression recognition algorithms.',
      icon: '👤',
      color: 'from-green-500/20 to-green-600/20'
    },
    {
      name: 'Chart Analysis',
      description: 'Advanced pattern recognition for technical analysis and trading signals.',
      icon: '📊',
      color: 'from-purple-500/20 to-purple-600/20'
    }
  ];

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold font-display mb-4">
            Powered by Advanced AI
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Our platform leverages cutting-edge artificial intelligence to deliver accurate and real-time analysis.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className="relative bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <div className="text-3xl mb-4">{tech.icon}</div>
                <h3 className="text-xl font-bold mb-3">{tech.name}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {tech.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-gray-400">AI Models Running in Real-time</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};