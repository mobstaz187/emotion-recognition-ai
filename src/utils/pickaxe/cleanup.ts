import { pickaxeState } from './state';

export function cleanupPickaxe(): void {
  // Remove scripts
  document.querySelectorAll('script[src*="pickaxeproject"]')
    .forEach(script => script.remove());

  // Reset PICKAXE object
  if (window.PICKAXE) {
    window.PICKAXE.pickaxes = [];
  }

  // Remove DOM elements
  document.querySelectorAll('[class*="pickaxe"]')
    .forEach(element => element.remove());

  // Reset state
  pickaxeState.initialized = false;
  pickaxeState.currentPickaxe = null;
}