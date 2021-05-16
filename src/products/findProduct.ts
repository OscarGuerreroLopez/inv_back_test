import { DbMethods } from "../db";

export const FindProduct = async <T>(where: IObjectLiteral): Promise<T> => {
  const products = await DbMethods.find<T>("products", where);

  return products;
};
