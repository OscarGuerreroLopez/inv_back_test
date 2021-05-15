export * from "./interfaces";
export * from "./validators";

import { DbAdapter } from "../utils";
import { ProductMethods } from "./productMethods";

const database: Database = DbAdapter();
const databaseMethods = ProductMethods(database);

export const ProductsList = async (): Promise<
  Readonly<{
    removeProduct: (where: IObjectLiteral) => Promise<boolean>;
    findProduct: (where: IObjectLiteral) => Promise<any>;
  }>
> => {
  const removeProduct = async (where: IObjectLiteral): Promise<boolean> => {
    const recordToRemove = await findProduct(where);

    if (recordToRemove.length !== 0) {
      const removedRecord = await databaseMethods.remove("products", where);

      return removedRecord;
    }
    return false;
  };

  const findProduct = async (where: IObjectLiteral) => {
    const products = await databaseMethods.find("products", where);

    return products;
  };

  return Object.freeze({ removeProduct, findProduct });
};
