import React from 'react';
import { Header } from './components/layout/Header';
import { MainContent } from './components/layout/MainContent';
import { ThemeProvider, createTheme } from '@mui/material';
import { EmotionProvider } from './contexts/EmotionContext';
import { ThemeProvider as CustomThemeProvider } from './contexts/ThemeContext';
import { WebcamProvider } from './contexts/WebcamContext';
import { ProfileProvider } from './contexts/ProfileContext';
import { TabProvider } from './contexts/TabContext';
import { ProfileSelection } from './components/profile/ProfileSelection';
import { useProfile } from './contexts/ProfileContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb',
    },
    secondary: {
      main: '#3b82f6',
    },
  },
});

const AppContent = () => {
  const { currentProfile } = useProfile();

  if (!currentProfile) {
    return <ProfileSelection />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      <Header />
      <MainContent />
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