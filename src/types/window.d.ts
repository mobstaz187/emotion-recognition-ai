interface Pickaxe {
  pickaxes: Array<{
    id: string;
    type: string;
  }>;
  style: string;
}

declare global {
  interface Window {
    PICKAXE: Pickaxe;
  }
}

export {};