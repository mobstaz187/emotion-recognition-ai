import React, { useEffect } from 'react';
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
import { SplashScreen } from './components/splash/SplashScreen';

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
  const { currentProfile, hasSeenSplash } = useProfile();

  // Show splash screen first
  if (!hasSeenSplash) {
    return <SplashScreen />;
  }

  // Then show profile selection
  if (!currentProfile) {
    return <ProfileSelection />;
  }

  if (currentProfile.name === 'Analyze') {
    return <LandingPage />;
  }

  const content = (
    <>
      <Header />
      <MainContent />
    </>
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
                <AppContent />
              </EmotionProvider>
            </WebcamProvider>
          </TabProvider>
        </ProfileProvider>
      </CustomThemeProvider>
    </ThemeProvider>
  );
}