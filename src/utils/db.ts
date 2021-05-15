// fake implementation of a db adapter, for example mongo
// with mongoose models
import _ from "underscore";
import { inventory as originalInventory } from "../config/fakeDb/inventory.json";
import { products as originalProducts } from "../config/fakeDb/products.json";
import { Inventory } from "../inventory";
import { Products } from "../products";

const dbInstancesModels: Map<
  string,
  Readonly<{
    find: <T>(where: Partial<T>) => T[];
    delete: <T>(where: Partial<T>) => T[];
  }>
> = new Map();

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
        throw { message: `collection ${collection} not found in db` };
      }
      return instanceModel;
    },
  };
};

const fakeModel = <T>(
  collection: T[],
): Readonly<{
  find: <T>(where: Partial<T>) => T[];
  delete: <T>(where: Partial<T>) => T[];
}> => {
  const methods = {
    find: (where: Partial<T>) => {
      return _.where(collection, where);
    },
    delete: (where: Partial<T>) => {
      const existingRecord = _.findWhere(collection, where) as T;

      collection = _.without(collection, existingRecord);

      return collection;
    },
  } as {
    find: <T>(where: Partial<T>) => T[];
    delete: <T>(where: Partial<T>) => T[];
  };

  return Object.freeze(methods); // so nobody can modify this
};
