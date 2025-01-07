import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/layout/Header';
import { MainContent } from './components/layout/MainContent';
import { ThemeProvider, createTheme } from '@mui/material';
import { EmotionProvider } from './contexts/EmotionContext';
import { WebcamProvider } from './contexts/WebcamContext';
import { ProfileProvider } from './contexts/ProfileContext';
import { TabProvider } from './contexts/TabContext';
import { ThemeProvider as CustomThemeProvider } from './contexts/ThemeContext';
import { ProfileSelection } from './components/profile/ProfileSelection';
import { LandingPage } from './components/landing/LandingPage';
import { useProfile } from './contexts/ProfileContext';
import { DisgustedLayout } from './components/layout/DisgustedLayout';

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
        <MainContent />
      </motion.div>
    </motion.div>
  );

  return currentProfile.name === 'Disgusted' ? (
    <DisgustedLayout>{content}</DisgustedLayout>
  ) : (
    <div className="min-h-screen bg-background text-foreground">
      {content}
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CustomThemeProvider>
        <ProfileProvider>
          <TabProvider>
            <WebcamProvider>
              <EmotionProvider>
                <AnimatePresence mode="wait">
                  <AppContent />
                </AnimatePresence>
              </EmotionProvider>
            </WebcamProvider>
          </TabProvider>
        </ProfileProvider>
      </CustomThemeProvider>
    </ThemeProvider>
  );
}