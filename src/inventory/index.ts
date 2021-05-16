export * from "./interfaces";
import { DbMethods } from "../db";
import { Inventory } from "./interfaces";

export const GetInventory = async (
  where: IObjectLiteral,
): Promise<Inventory> => {
  const inventory = await DbMethods.find<Inventory>("inventory", where);

  return inventory;
};
