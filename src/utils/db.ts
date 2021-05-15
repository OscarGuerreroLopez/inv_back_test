// fake implementation of a db adapter, for example mongo
// with mongoose models
import _ from "underscore";
import { inventory as originalInventory } from "../config/fakeDb/inventory.json";
import { products as originalProducts } from "../config/fakeDb/products.json";
import { Inventory } from "../inventory";
import { Products } from "../products";

interface FakeDb {
  inventory: Inventory;
  products: Products;
}

const fakeDb: FakeDb = {
  inventory: originalInventory,
  products: originalProducts,
};

export const DbAdapter = (): Map<string, any> => {
  const dbInstances: Map<string, IObjectLiteral> = new Map();
  dbInstances.set("inventory", fakeModel(fakeDb.inventory));
  dbInstances.set("products", fakeModel(fakeDb.products));
  console.log("@@@111", dbInstances);

  return dbInstances;
};

const fakeModel = (collection: any) => {
  const methods = {
    find: (where: IObjectLiteral) => {
      return _.where(collection, where);
    },
    delete: (where: IObjectLiteral) => {
      collection = _.without(collection, _.findWhere(collection, where));

      return collection;
    },
  };

  return Object.freeze(methods); // so nobody can modify this
};
