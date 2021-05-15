// fake implementation of a db adapter, for example mongo
// with mongoose models
import _ from "underscore";
import { inventory as originalInventory } from "../config/fakeDb/inventory.json";
import { products as originalProducts } from "../config/fakeDb/products.json";
import { Inventory } from "../inventory";
import { Products } from "../products";

const dbInstancesModels: Map<string, IObjectLiteral> = new Map();

export const DbAdapter = (): Database => {
  if (Array.from(dbInstancesModels.keys()).length === 0) {
    dbInstancesModels.set(
      "inventory",
      fakeModel(originalInventory as Inventory),
    );
    dbInstancesModels.set("products", fakeModel(originalProducts as Products));
  }

  return {
    collection: (collection: string) => {
      const instanceModel = dbInstancesModels.get(collection);
      if (!instanceModel) {
        throw { message: "collection not found in db" };
      }
      return instanceModel;
    },
  };
};

const fakeModel = (collection: unknown[]) => {
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
