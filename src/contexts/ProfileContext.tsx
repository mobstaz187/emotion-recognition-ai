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
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const STORAGE_KEY = 'selectedProfile';

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(() => {
    // Try to load saved profile from localStorage on initial render
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  // Save profile to localStorage whenever it changes
  useEffect(() => {
    if (currentProfile) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentProfile));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [currentProfile]);

  return (
    <ProfileContext.Provider value={{ currentProfile, setCurrentProfile }}>
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