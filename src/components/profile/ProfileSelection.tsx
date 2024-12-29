import React from 'react';
import { ProfileAvatar } from './ProfileAvatar';
import { useProfile } from '../../contexts/ProfileContext';
import type { Profile } from '../../contexts/ProfileContext';
import { getEmotionColor } from '../../utils/emotionColors';
import { getEmotionEmoji } from '../../utils/emotionEmojis';
import { SocialLinks } from '../common/SocialLinks';

const PROFILES: Profile[] = [
  { id: '1', name: 'Happy', color: getEmotionColor('happy'), avatar: getEmotionEmoji('happy') },
  { id: '2', name: 'Sad', color: getEmotionColor('sad'), avatar: getEmotionEmoji('sad') },
  { id: '3', name: 'Angry', color: getEmotionColor('angry'), avatar: getEmotionEmoji('angry') },
  { id: '4', name: 'Fearful', color: getEmotionColor('fearful'), avatar: getEmotionEmoji('fearful') },
  { id: '5', name: 'Disgusted', color: getEmotionColor('disgusted'), avatar: getEmotionEmoji('disgusted') },
  { id: '6', name: 'Surprised', color: getEmotionColor('surprised'), avatar: getEmotionEmoji('surprised') },
  { id: '7', name: 'Neutral', color: getEmotionColor('neutral'), avatar: getEmotionEmoji('neutral') },
  { id: 'analyze', name: 'Analyze', color: '#2563eb', avatar: '🔍' },
];

export const ProfileSelection: React.FC = () => {
  const { setCurrentProfile } = useProfile();

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold text-white mb-12">Choose Your Mode</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {PROFILES.map((profile) => (
          <div key={profile.id} className="flex flex-col items-center gap-4">
            <ProfileAvatar
              profile={profile}
              size="lg"
              onClick={() => setCurrentProfile(profile)}
            />
            <span className="text-gray-400 text-lg">{profile.name}</span>
          </div>
        ))}
      </div>
      <SocialLinks />
    </div>
  );
};