import { Inventory } from "../inventory";
import { DbMethods } from "../db";
import { Products } from "./interfaces";

export const FindProduct = async (
  where: IObjectLiteral,
): Promise<IObjectLiteral[]> => {
  const products = await DbMethods.find<Products>("products", where);
  const inventory = await DbMethods.find<Inventory>("inventory", {});

  let productItemsObject: IObjectLiteral[] = [];
  let inventoryItemsObject: IObjectLiteral = {};

  for (const inventoryItem of inventory) {
    inventoryItemsObject = {
      ...inventoryItemsObject,
      ...{ [inventoryItem.art_id]: inventoryItem.name },
    };
  }

  for (const product of products) {
    productItemsObject = [
      ...productItemsObject,
      {
        name: product.name,
        contain_articles: product.contain_articles.map((article) => {
          const { art_id, amount_of } = article;
          return {
            art_id,
            name: inventoryItemsObject[art_id] || "",
            amount_of,
          };
        }),
      },
    ];
  }

  return productItemsObject;
};
