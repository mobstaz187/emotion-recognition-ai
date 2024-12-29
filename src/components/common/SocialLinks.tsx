import React from 'react';

export const SocialLinks: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 flex items-center space-x-4">
      <a
        href="https://x.com"
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
        aria-label="X (Twitter)"
      >
        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </a>
      <a
        href="https://pump.fun"
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
        aria-label="Pump.fun"
      >
        <div className="w-6 h-6 relative">
          <div className="absolute inset-0 rounded-full bg-[#4ADE80]"></div>
          <div className="absolute inset-2 rounded-full bg-white"></div>
        </div>
      </a>
    </div>
  );
};