export const SocialLinks: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6">
      <a
        href="https://x.com/peliosgg"
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 flex items-center justify-center rounded-full 
          bg-black/30 backdrop-blur-xl border border-white/10 
          hover:bg-black/50 transition-colors"
        aria-label="X (Twitter)"
      >
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </a>
    </div>
  );
};