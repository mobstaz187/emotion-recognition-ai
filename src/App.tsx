import { Header } from './components/layout/Header';
import { MainContent } from './components/layout/MainContent';
import { ThemeProvider, createTheme } from '@mui/material';
import { EmotionProvider } from './contexts/EmotionContext';
import { WebcamProvider } from './contexts/WebcamContext';
import { ProfileProvider } from './contexts/ProfileContext';
import { TabProvider } from './contexts/TabContext';
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
      <ProfileProvider>
        <TabProvider>
          <WebcamProvider>
            <EmotionProvider>
              <AppContent />
            </EmotionProvider>
          </WebcamProvider>
        </TabProvider>
      </ProfileProvider>
    </ThemeProvider>
  );
}