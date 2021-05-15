export interface InventoryItem {
  art_id: string;
  name: string;
  stock: string;
}

export type Inventory = InventoryItem[];
