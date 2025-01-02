import { initializePickaxe } from './initialize';
import { loadScript } from './script';

export async function loadPickaxeScript(pickaxeId: string): Promise<void> {
  try {
    // Initialize before loading script
    initializePickaxe(pickaxeId);

    const response = await fetch(`https://embed.pickaxeproject.com/axe/api/script/${pickaxeId}`);
    const { v } = await response.json();
    const cdnUrl = `https://cdn.jsdelivr.net/gh/pickaxeproject/cdn@${v}/dist`;
    
    await loadScript(cdnUrl);
  } catch (error) {
    console.error('Failed to load Pickaxe script:', error);
  }
}