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
  resetProfile: () => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const STORAGE_KEY = 'selectedProfile';

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (currentProfile) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentProfile));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [currentProfile]);

  const resetProfile = () => {
    setCurrentProfile(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  useEffect(() => {
    let currentMenu: HTMLDivElement | null = null;

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();

      // Remove existing menu if it exists
      if (currentMenu && document.body.contains(currentMenu)) {
        document.body.removeChild(currentMenu);
      }

      const menu = document.createElement('div');
      currentMenu = menu;
      menu.className = 'fixed bg-white dark:bg-card border border-border rounded-lg shadow-lg py-1 z-[100]';

      // Get viewport dimensions
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Calculate initial position
      let left = e.clientX;
      let top = e.clientY + window.scrollY; // Add scroll offset

      // Create menu first to get its dimensions
      document.body.appendChild(menu);
      const menuWidth = menu.offsetWidth;
      const menuHeight = menu.offsetHeight;

      // Adjust position if menu would go outside viewport
      if (left + menuWidth > viewportWidth) {
        left = viewportWidth - menuWidth - 10;
      }
      if (top + menuHeight > window.scrollY + viewportHeight) {
        top = window.scrollY + viewportHeight - menuHeight - 10;
      }

      // Apply adjusted position
      menu.style.left = `${left}px`;
      menu.style.top = `${top}px`;
      
      const resetButton = document.createElement('button');
      resetButton.className = 'w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-white/5 transition-colors';
      resetButton.textContent = 'Reset Profile';
      resetButton.onclick = () => {
        resetProfile();
        if (document.body.contains(menu)) {
          document.body.removeChild(menu);
        }
      };
      
      menu.appendChild(resetButton);

      const handleClickOutside = (event: MouseEvent) => {
        if (!menu.contains(event.target as Node)) {
          if (document.body.contains(menu)) {
            document.body.removeChild(menu);
          }
          document.removeEventListener('click', handleClickOutside);
        }
      };

      // Remove menu on next tick to avoid instant removal
      setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
      });
    };

    document.addEventListener('contextmenu', handleContextMenu);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      if (currentMenu && document.body.contains(currentMenu)) {
        document.body.removeChild(currentMenu);
      }
    };
  }, []);

  return (
    <ProfileContext.Provider value={{ currentProfile, setCurrentProfile, resetProfile }}>
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