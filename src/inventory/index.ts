export * from "./interfaces";
import { DbMethods } from "../db";
import { Inventory, InventoryItem } from "./interfaces";

export const GetInventory = async (
  where: IObjectLiteral,
): Promise<Inventory> => {
  const inventory = await DbMethods.find<Inventory>("inventory", where);

  return inventory;
};

export const GetInventoryItem = async (
  where: IObjectLiteral,
): Promise<InventoryItem> => {
  const inventoryItem = await DbMethods.findOne<InventoryItem>(
    "inventory",
    where,
  );

  return inventoryItem;
};

export const UpdateInventoryItem = async (
  where: IObjectLiteral,
  values: IObjectLiteral,
): Promise<InventoryItem> => {
  const updatedInventoryItem = await DbMethods.updateOne<InventoryItem>(
    "inventory",
    where,
    values,
  );
  return updatedInventoryItem;
};
