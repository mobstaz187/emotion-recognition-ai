import React, { useEffect } from 'react';
import { loadPickaxeScript } from '../../utils/pickaxe/loader';
import { cleanupPickaxe } from '../../utils/pickaxe/cleanup';
import { pickaxeState } from '../../utils/pickaxe/state';

const PICKAXE_ID = "Surprise_CKY0O";

export const PickaxeScript: React.FC = () => {
  useEffect(() => {
    // Only initialize if not already done
    if (!pickaxeState.initialized) {
      loadPickaxeScript(PICKAXE_ID);
    }
    
    return () => {
      cleanupPickaxe();
    };
  }, []);

  return null;
};