import { ThemeProvider, createTheme } from '@mui/material';
import { Header } from './components/layout/Header';
import { MainContent } from './components/layout/MainContent';
import { EmotionProvider } from './contexts/EmotionContext';
import { WebcamProvider } from './contexts/WebcamContext';
import { ProfileProvider } from './contexts/ProfileContext';
import { TabProvider } from './contexts/TabContext';
import { ThemeProvider as CustomThemeProvider } from './contexts/ThemeContext';
import { TokenProvider } from './contexts/TokenContext';
import { ProfileSelection } from './components/profile/ProfileSelection';
import { LandingPage } from './components/landing/LandingPage';
import { useProfile } from './contexts/ProfileContext';
import { DisgustedLayout } from './components/layout/DisgustedLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#50fa7b',
    },
    secondary: {
      main: '#45E066',
    },
  },
});

const AppContent = () => {
  const { currentProfile } = useProfile();
  const [showChartInstructions, setShowChartInstructions] = useState(false);
  const [showTokenInstructions, setShowTokenInstructions] = useState(false);

  if (!currentProfile) {
    return <ProfileSelection />;
  }

  if (currentProfile.name === 'Analyze') {
    return <LandingPage />;
  }

  const content = (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
          }
        }
      }}
    >
      <motion.div
        variants={{
          hidden: { y: -20, opacity: 0 },
          visible: { y: 0, opacity: 1 }
        }}
      >
        <Header />
      </motion.div>
      <motion.div
        variants={{
          hidden: { y: 20, opacity: 0 },
          visible: { y: 0, opacity: 1 }
        }}
      >
        <MainContent 
          showChartInstructions={showChartInstructions}
          setShowChartInstructions={setShowChartInstructions}
          showTokenInstructions={showTokenInstructions}
          setShowTokenInstructions={setShowTokenInstructions}
        />
      </motion.div>
    </motion.div>
  );

  return (
    <>
      {currentProfile.name === 'Disgusted' ? (
        <DisgustedLayout>{content}</DisgustedLayout>
      ) : (
        <div className="min-h-screen bg-background text-foreground">
          {content}
        </div>
      )}

      {/* Chart Instructions Overlay */}
      {showChartInstructions && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-card rounded-xl border border-border p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-foreground mb-4">Welcome</h3>
                <p className="text-muted-foreground mb-6">
                  Our advanced AI detects support and resistance levels in your charts, helping you identify key price levels and potential trading opportunities.
                </p>
              </div>

              <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <p className="text-sm text-foreground">
                  For more clear and precise analysis, we recommend users to upload a 1600x600 and up resolution images. Make sure that only the chart is visible and other indicators like volume, RSI, MACD are not present in the image. See image for reference.
                </p>
              </div>

              <div className="relative aspect-video rounded-lg border border-border overflow-hidden">
                <img 
                  src="/BTC-Sample.png" 
                  alt="Sample Chart" 
                  className="object-contain"
                />
              </div>

              <div>
                <h4 className="text-xl font-semibold text-foreground mb-4">How to Use:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <ol className="list-decimal list-inside space-y-3 text-foreground">
                      <li>Upload your chart image</li>
                      <li>Adjust color detection settings if needed</li>
                      <li>Select market scenario (bullish/bearish/neutral)</li>
                      <li>View detected support and resistance levels</li>
                      <iframe
  width="100%"
  height="600"
  src="https://birdeye.so/tv-widget/DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263?chain=solana&viewMode=pair&chartInterval=1D&chartType=CANDLE&chartTimezone=Asia%2FSingapore&chartLeftToolbar=show&theme=dark"
  frameBorder="0"
  allowfullscreen
></iframe>
                    </ol>
                  </div>
                  <div className="relative aspect-video rounded-lg border border-border overflow-hidden">
                    <img 
                      src="./Chart-Analysis.gif" 
                      alt="Chart Analysis Demo" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setShowChartInstructions(false)}
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Got it!
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Token Sentiment Instructions Overlay */}
      {showTokenInstructions && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-card rounded-xl border border-border p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-foreground mb-4">Welcome to Token Sentiment Analysis</h3>
                <p className="text-muted-foreground mb-6">
                  Our advanced AI analyzes token sentiment across multiple timeframes, providing comprehensive market insights 
                  and technical analysis to help you make informed trading decisions.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-foreground mb-4">How to Use:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <ol className="list-decimal list-inside space-y-3 text-foreground">
                      <li>Paste the token contract address.</li>
                      <li>Click Analyze to start sentiment analysis.</li>
                      <li>View technical indicators and market metrics.</li>
                      <li>Check timeframe analysis for different periods.</li>
                    </ol>
                  </div>
                  <div className="relative aspect-video rounded-lg border border-border overflow-hidden">
                    <img 
                      src="./Token-Sentiment.gif" 
                      alt="Token Analysis Demo" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setShowTokenInstructions(false)}
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Got it!
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CustomThemeProvider>
        <ProfileProvider>
          <TabProvider>
            <TokenProvider>
              <WebcamProvider>
                <EmotionProvider>
                  <AnimatePresence mode="wait">
                    <AppContent />
                  </AnimatePresence>
                </EmotionProvider>
              </WebcamProvider>
            </TokenProvider>
          </TabProvider>
        </ProfileProvider>
      </CustomThemeProvider>
    </ThemeProvider>
  );
}