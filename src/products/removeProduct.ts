import { DbMethods } from "../db";
import { UpdateInventoryItem, GetInventoryItem } from "../inventory";
import { FindProduct } from "./findProduct";

export const RemoveProduct = async (
  where: IObjectLiteral,
): Promise<boolean> => {
  // first we find the product
  const productToRemove = await FindProduct(where);

  // if there is no product then don't do anything
  if (productToRemove.length === 0) {
    return false;
  }

  // if there are more than one product something is not right, products must be uniqued
  if (productToRemove.length > 1) {
    throw {
      message: `product names must be unique but found more than one product for ${where}`,
    };
  }

  const articles = productToRemove[0].contain_articles;

  for (const article of articles) {
    const where = { art_id: article.art_id };
    const inventoryItem = await GetInventoryItem(where);

    const newStock =
      parseInt(inventoryItem.stock) - parseInt(article.amount_of);

    inventoryItem.stock = newStock.toString();

    const { art_id, ...values } = inventoryItem;

    await UpdateInventoryItem(where, values);
  }

  const removedProduct = await DbMethods.remove("products", where);

  return removedProduct;
};
