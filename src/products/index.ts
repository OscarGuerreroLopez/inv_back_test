export * from "./interfaces";
export * from "./validators";
import { DbMethods } from "../db";
import { Products } from "./interfaces";

export const RemoveProduct = async (
  where: IObjectLiteral,
): Promise<boolean> => {
  const recordToRemove = await FindProduct(where);

  if (recordToRemove.length !== 0) {
    const removedRecord = await DbMethods.remove("products", where);

    return removedRecord;
  }
  return false;
};

export const FindProduct = async (where: IObjectLiteral): Promise<any> => {
  const products = await DbMethods.find<Products>("products", where);

  return products;
};
