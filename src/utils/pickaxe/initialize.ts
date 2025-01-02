import { PICKAXE_STYLE } from './constants';
import { pickaxeState } from './state';

export function initializePickaxe(pickaxeId: string): void {
  if (pickaxeState.initialized) return;
  
  pickaxeState.initialized = true;
  pickaxeState.currentPickaxe = {
    id: pickaxeId,
    type: 'fab'
  };
  
  window.PICKAXE = {
    pickaxes: [pickaxeState.currentPickaxe],
    style: PICKAXE_STYLE
  };
}