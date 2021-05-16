export * from "./interfaces";
export * from "./validators";
import { DbMethods } from "../db";

export const ProductsList = async (): Promise<
  Readonly<{
    removeProduct: (where: IObjectLiteral) => Promise<boolean>;
    findProduct: (where: IObjectLiteral) => Promise<any>;
  }>
> => {
  const removeProduct = async (where: IObjectLiteral): Promise<boolean> => {
    const recordToRemove = await findProduct(where);

    if (recordToRemove.length !== 0) {
      const removedRecord = await DbMethods.remove("products", where);

      return removedRecord;
    }
    return false;
  };

  const findProduct = async (where: IObjectLiteral) => {
    const products = await DbMethods.find("products", where);

    return products;
  };

  return Object.freeze({ removeProduct, findProduct });
};
