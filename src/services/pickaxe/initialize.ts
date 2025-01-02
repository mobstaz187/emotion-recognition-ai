import { PICKAXE_CONFIG, PICKAXE_ID } from './config';
import { loadPickaxeScript } from './loader';

export async function initializePickaxe(): Promise<void> {
  // Initialize PICKAXE object
  window.PICKAXE = {
    pickaxes: [],
    style: PICKAXE_CONFIG.style
  };

  // Add pickaxe instance
  window.PICKAXE.pickaxes.push({
    id: PICKAXE_ID,
    type: "inline"
  });

  try {
    // Load script from API
    const response = await fetch(`https://embed.pickaxeproject.com/axe/api/script/${PICKAXE_ID}`);
    const { v } = await response.json();
    const scriptUrl = `https://cdn.jsdelivr.net/gh/pickaxeproject/cdn@${v}/dist/bundle.js`;
    
    await loadPickaxeScript(scriptUrl);
  } catch (error) {
    console.error('Failed to initialize Pickaxe:', error);
  }
}