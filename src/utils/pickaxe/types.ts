export interface PickaxeInstance {
  id: string;
  type: 'fab';
}

export interface PickaxeState {
  initialized: boolean;
  currentPickaxe: PickaxeInstance | null;
}

export interface PickaxeConfig {
  pickaxes: PickaxeInstance[];
  style: string;
}