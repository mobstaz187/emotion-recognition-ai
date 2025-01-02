import type { PickaxeInstance } from './types';

export class PickaxeSingleton {
  private static instance: PickaxeSingleton;
  private initialized = false;
  private currentPickaxe: PickaxeInstance | null = null;

  private constructor() {}

  static getInstance(): PickaxeSingleton {
    if (!PickaxeSingleton.instance) {
      PickaxeSingleton.instance = new PickaxeSingleton();
    }
    return PickaxeSingleton.instance;
  }

  initialize(pickaxeId: string): void {
    if (this.initialized) return;
    
    this.currentPickaxe = {
      id: pickaxeId,
      type: 'fab'
    };
    
    this.initialized = true;
  }

  cleanup(): void {
    this.initialized = false;
    this.currentPickaxe = null;
  }

  isInitialized(): boolean {
    return this.initialized;
  }

  getCurrentPickaxe(): PickaxeInstance | null {
    return this.currentPickaxe;
  }
}