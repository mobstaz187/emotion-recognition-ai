import { motion } from 'framer-motion';
import { useTab } from '../../../contexts/TabContext';

export const HeroSection = () => {
  const { setActiveTab } = useTab();

  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header with Separator */}
        <div className="flex items-center justify-center gap-8 mb-12">
          <div className="flex items-center gap-4">
            <motion.img 
              src="./Untitled-1.png"
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
            <div className="text-left">
              <h1 className="text-6xl font-bold font-display mb-2">
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  PELIOS
                </span>
              </h1>
              <p className="text-muted-foreground">Powered by $PELIOS</p>
            </div>
          </div>
          
          <div className="h-16 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
          
          <div className="text-left">
            <h2 className="text-4xl font-bold font-display mb-2">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                AI-Powered Analysis
              </span>
            </h2>
            <p className="text-muted-foreground">Advanced emotion detection & market sentiment</p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Live Analysis Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="group relative bg-card border border-border rounded-2xl p-8 cursor-pointer flex flex-col"
            onClick={() => setActiveTab('live')}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex-1">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
                Live Analysis
              </h3>
              <p className="text-muted-foreground mb-6">
                Real-time emotion detection through your webcam with advanced AI technology.
              </p>
            </div>
            <div className="flex items-center justify-center text-blue-400 font-medium">
              Try Now
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </motion.div>

          {/* Token Analysis Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="group relative bg-card border border-border rounded-2xl p-8 cursor-pointer flex flex-col"
            onClick={() => setActiveTab('monitor')}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex-1">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Token Analysis
              </h3>
              <p className="text-muted-foreground mb-6">
                Advanced market sentiment analysis using AI to detect trading signals.
              </p>
            </div>
            <div className="flex items-center justify-center text-purple-400 font-medium">
              Analyze Now
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Additional Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Image Upload',
              description: 'Upload and analyze emotions in photos',
              icon: '📸',
              tab: 'upload'
            },
            {
              title: 'Chart Analysis',
              description: 'Detect support and resistance levels',
              icon: '📊',
              tab: 'chart'
            },
            {
              title: 'Documentation',
              description: 'Learn about our AI algorithms',
              icon: '📚',
              tab: 'docs'
            }
          ].map((feature) => (
            <motion.div
              key={feature.title}
              whileHover={{ scale: 1.02 }}
              className="group relative bg-card border border-border rounded-xl p-6 cursor-pointer"
              onClick={() => setActiveTab(feature.tab)}
            >
              <div className="text-2xl mb-3">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};