import React, { useEffect } from 'react';
import { initializePickaxe } from '../../services/pickaxe/initialize';
import { cleanupPickaxeScripts } from '../../services/pickaxe/loader';
import { PICKAXE_ID } from '../../services/pickaxe/config';

export const SurprisedChat: React.FC = () => {
  useEffect(() => {
    initializePickaxe();
    return () => cleanupPickaxeScripts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="flex justify-center">
          <div id={`pickaxe-inline-${PICKAXE_ID}`} className="w-full max-w-2xl" />
        </div>
      </div>
    </div>
  );
};