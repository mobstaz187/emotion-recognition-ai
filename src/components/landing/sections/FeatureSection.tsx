import { features } from '../data/features';

export const FeatureSection = () => {
  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-24">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`flex flex-col md:flex-row items-center gap-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Image Section - Always on top for mobile */}
              <div className="flex-[1.5] w-full md:w-auto">
                <div 
                  className="rounded-xl p-1"
                  style={{ backgroundColor: `${feature.color}10` }}
                >
                  {feature.title === 'Real-time Analysis' ? (
                    <div className="aspect-[16/9] rounded-xl bg-card border border-border overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-transform duration-300 hover:scale-[1.02]">
                      <img 
                        src="./LiveAnalysis.gif" 
                        alt="Live Analysis"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : feature.title === 'Token Sentiment' ? (
                    <div className="aspect-[16/9] rounded-xl bg-card border border-border overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-transform duration-300 hover:scale-[1.02]">
                      <img 
                        src="./Token-Sentiment.gif" 
                        alt="Token Sentiment Analysis"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : feature.title === 'Chart Analysis' ? (
                    <div className="aspect-[16/9] rounded-xl bg-card border border-border overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-transform duration-300 hover:scale-[1.02]">
                      <img 
                        src="./Chart-Analysis.gif" 
                        alt="Chart Analysis"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : feature.title === 'Image Upload' ? (
                    <div className="aspect-[16/9] rounded-xl bg-card border border-border overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-transform duration-300 hover:scale-[1.02]">
                      <img 
                        src="./Sad-Analysis.png" 
                        alt="Sad Analysis"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[16/9] rounded-xl bg-card border border-border shadow-[0_8px_32px_rgba(0,0,0,0.4)]
                      flex items-center justify-center transition-transform duration-300 hover:scale-[1.02]">
                      <feature.icon className="w-16 h-16 text-muted-foreground" />
                    </div>
                  )}
                </div>
              </div>

              {/* Text Section - Below image on mobile */}
              <div className="flex-1 text-center md:text-left">
                <h3 
                  className="text-3xl font-bold mb-4"
                  style={{ color: feature.color }}
                >
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};