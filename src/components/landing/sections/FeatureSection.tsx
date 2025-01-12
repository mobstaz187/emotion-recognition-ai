import { features } from '../data/features';

export const FeatureSection = () => {
  return (
    <section className="py-32">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-24">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`flex items-center gap-12 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              <div className="flex-1">
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
              <div 
                className="flex-1 p-8 rounded-2xl"
                style={{ backgroundColor: `${feature.color}10` }}
              >
                {feature.title === 'Real-time Analysis' ? (
                  <div className="aspect-video rounded-xl bg-card border border-border overflow-hidden flex items-center justify-center">
                    <img 
                      src="/LiveAnalysis.gif" 
                      alt="Live Analysis"
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : feature.title === 'Token Sentiment' ? (
                  <div className="aspect-video rounded-xl bg-card border border-border overflow-hidden flex items-center justify-center">
                    <img 
                      src="/Token-Sentiment.gif" 
                      alt="Token Sentiment Analysis"
                      className="w-[115%] h-[115%] object-contain"
                    />
                  </div>
                ) : feature.title === 'Chart Analysis' ? (
                  <div className="aspect-video rounded-xl bg-card border border-border overflow-hidden flex items-center justify-center">
                    <img 
                      src="/Chart-Analysis.gif" 
                      alt="Chart Analysis"
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : feature.title === 'Image Upload' ? (
                  <div className="aspect-video rounded-xl bg-card border border-border overflow-hidden flex items-center justify-center">
                    <img 
                      src="/Sad-Analysis.png" 
                      alt="Sad Analysis"
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="aspect-video rounded-xl bg-card border border-border 
                    flex items-center justify-center">
                    <feature.icon className="w-16 h-16 text-muted-foreground" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};