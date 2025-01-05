import { motion } from 'framer-motion';

const technologies = [
  {
    name: 'TensorFlow.js',
    description: 'Real-time emotion detection using deep learning models optimized for browser performance.',
    icon: '🧠',
  },
  {
    name: 'Face-API',
    description: 'State-of-the-art facial detection and expression recognition algorithms.',
    icon: '👤',
  },
  {
    name: 'Chart Analysis',
    description: 'Advanced pattern recognition for technical analysis and trading signals.',
    icon: '📊',
  }
];

export const TechnologySection = () => {
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
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our platform leverages cutting-edge artificial intelligence to deliver accurate and real-time analysis.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ 
                opacity: 0,
                x: (index - 1) * 50 // Slide from different directions
              }}
              whileInView={{ 
                opacity: 1,
                x: 0
              }}
              transition={{ 
                duration: 0.8,
                delay: index * 0.2
              }}
              viewport={{ once: true }}
            >
              <div className="bg-card/80 border border-border rounded-2xl p-8 h-full flex flex-col items-center text-center">
                <span className="text-4xl mb-4">{tech.icon}</span>
                <h3 className="text-xl font-bold mb-3">{tech.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-muted-foreground">AI Models Running in Real-time</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};