import React from 'react';
import { ProfileAvatar } from './ProfileAvatar';
import { useProfile } from '../../contexts/ProfileContext';
import { ThemeToggle } from '../theme/ThemeToggle';
import type { Profile } from '../../contexts/ProfileContext';
import { SocialLinks } from '../common/SocialLinks';

const PROFILES: Profile[] = [
  { id: '1', name: 'Happy', color: '#D97706', emoji: '😊' },
  { id: '2', name: 'Sad', color: '#3B82F6', emoji: '😢' },
  { id: '3', name: 'Angry', color: '#EF4444', emoji: '😠' },
  { id: '4', name: 'Fearful', color: '#8B5CF6', emoji: '😨' },
  { id: '5', name: 'Disgusted', color: '#10B981', emoji: '🤢' },
  { id: '6', name: 'Surprised', color: '#EC4899', emoji: '😮' },
];

export const ProfileSelection: React.FC = () => {
  const { setCurrentProfile } = useProfile();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>
      
      <div className="flex items-center gap-8 mb-12">
        <img 
          src="./public/pill-icon.png" 
          alt="Pill Icon" 
          className="w-16 h-16"
          style={{ imageRendering: 'pixelated' }}
        />
        <div className="text-center">
          <h1 className="text-6xl font-bold font-display bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            PELIOS
          </h1>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent my-3" />
          <p className="text-xl text-muted-foreground font-display">Choose Your Avatar</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-3xl">
        {PROFILES.map((profile) => (
          <div key={profile.id} className="flex flex-col items-center gap-4">
            <ProfileAvatar
              profile={profile}
              size="lg"
              onClick={() => setCurrentProfile(profile)}
            />
            <span className="text-muted-foreground text-lg">{profile.name}</span>
          </div>
        ))}
      </div>
      <SocialLinks />
    </div>
  );
};