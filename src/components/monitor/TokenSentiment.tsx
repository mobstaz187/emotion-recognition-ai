import React from 'react';
import { motion } from 'framer-motion';
import { TokenData } from '../../types/token';
import { analyzeSentiment } from '../../utils/sentiment/analysis';
import { getEmotionColor } from '../../utils/emotionColors';
import { SentimentIcon } from './SentimentIcon';

interface Props {
  data: TokenData;
}

export const TokenSentiment: React.FC<Props> = ({ data }) => {
  const sentiment = analyzeSentiment(data);
  const color = getEmotionColor(sentiment.emotion);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const signalVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-card/80 rounded-lg p-6 border border-border"
    >
      <motion.h3 
        variants={itemVariants}
        className="text-lg font-semibold text-foreground mb-4"
      >
        Market Sentiment
      </motion.h3>
      
      <motion.div 
        variants={itemVariants}
        className="flex items-center gap-3 mb-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2
          }}
        >
          <SentimentIcon emotion={sentiment.emotion} className="w-8 h-8" color={color} />
        </motion.div>
        <div>
          <motion.p 
            variants={itemVariants}
            className="text-xl font-semibold capitalize"
            style={{ color }}
          >
            {sentiment.emotion}
          </motion.p>
          <motion.p 
            variants={itemVariants}
            className="text-sm text-muted-foreground"
          >
            {Math.round(sentiment.confidence * 100)}% confidence
          </motion.p>
        </div>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-3 gap-4"
      >
        {/* Bearish Signals */}
        <motion.div
          variants={itemVariants}
          className="bg-red-500/10 border border-red-500/20 rounded-lg p-4"
        >
          <h4 className="text-red-400 font-medium mb-2">Bearish Signals</h4>
          <motion.ul className="space-y-2">
            {sentiment.signals.bearish.map((signal, index) => (
              <motion.li
                key={index}
                variants={signalVariants}
                className="text-sm text-foreground flex items-center gap-2"
              >
                <span className="text-red-400">↘</span>
                {signal}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Neutral Signals */}
        <motion.div
          variants={itemVariants}
          className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4"
        >
          <h4 className="text-blue-400 font-medium mb-2">Neutral Signals</h4>
          <motion.ul className="space-y-2">
            {sentiment.signals.neutral.map((signal, index) => (
              <motion.li
                key={index}
                variants={signalVariants}
                className="text-sm text-foreground flex items-center gap-2"
              >
                <span className="text-blue-400">→</span>
                {signal}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Bullish Signals */}
        <motion.div
          variants={itemVariants}
          className="bg-green-500/10 border border-green-500/20 rounded-lg p-4"
        >
          <h4 className="text-green-400 font-medium mb-2">Bullish Signals</h4>
          <motion.ul className="space-y-2">
            {sentiment.signals.bullish.map((signal, index) => (
              <motion.li
                key={index}
                variants={signalVariants}
                className="text-sm text-foreground flex items-center gap-2"
              >
                <span className="text-green-400">↗</span>
                {signal}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};