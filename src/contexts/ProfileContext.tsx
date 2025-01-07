import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Profile {
  id: string;
  name: string;
  color: string;
  emoji: string;
}

interface ProfileContextType {
  currentProfile: Profile | null;
  setCurrentProfile: (profile: Profile | null) => void;
  hasSeenSplash: boolean;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from localStorage
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(() => {
    const savedProfile = localStorage.getItem('currentProfile');
    return savedProfile ? JSON.parse(savedProfile) : null;
  });

  // Track if user has seen splash screen
  const [hasSeenSplash, setHasSeenSplash] = useState(() => {
    return localStorage.getItem('hasSeenSplash') === 'true';
  });

  // Save profile to localStorage whenever it changes
  useEffect(() => {
    if (currentProfile) {
      localStorage.setItem('currentProfile', JSON.stringify(currentProfile));
      // Mark splash as seen when profile is selected
      if (!hasSeenSplash) {
        localStorage.setItem('hasSeenSplash', 'true');
        setHasSeenSplash(true);
      }
    } else {
      localStorage.removeItem('currentProfile');
    }
  }, [currentProfile, hasSeenSplash]);

  return (
    <ProfileContext.Provider value={{ 
      currentProfile, 
      setCurrentProfile,
      hasSeenSplash
    }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};