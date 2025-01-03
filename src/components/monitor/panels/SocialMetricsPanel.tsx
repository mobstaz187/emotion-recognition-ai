import React from 'react';
import { SocialMetrics } from '../../../types/token';
import { motion } from 'framer-motion';

interface Props {
  metrics: SocialMetrics;
}

export const SocialMetricsPanel: React.FC<Props> = ({ metrics }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/20 backdrop-blur-xl rounded-xl border border-white/10 p-6"
    >
      <h3 className="text-xl font-semibold mb-4">Social Metrics</h3>
      
      <div className="space-y-4">
        <div className="bg-white/5 rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-1">Twitter Followers</div>
          <div className="text-lg font-semibold">{metrics.twitterFollowers.toLocaleString()}</div>
        </div>

        <div className="bg-white/5 rounded-lg p-4">
          <div className="text-sm text-gray-400 mb-1">Twitter Engagement</div>
          <div className="text-lg font-semibold">{metrics.twitterEngagement.toLocaleString()}</div>
          <div className="text-xs text-gray-500">interactions/day</div>
        </div>
      </div>
    </motion.div>
  );
};