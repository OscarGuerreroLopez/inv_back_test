// fake implementation of a db adapter, for example mongo
// with mongoose models
import _ from "underscore";
import { inventory as originalInventory } from "../config/fakeDb/inventory.json";
import { products as originalProducts } from "../config/fakeDb/products.json";

interface InstanceModel {
  find: <T>(where: Partial<T>) => T[];
  delete: <T>(where: Partial<T>) => T[];
}

const dbInstancesModels: Map<string, Readonly<InstanceModel>> = new Map();

export const DbAdapter = (): Database => {
  if (Array.from(dbInstancesModels.keys()).length === 0) {
    dbInstancesModels.set("inventory", fakeModel(originalInventory));
    dbInstancesModels.set("products", fakeModel(originalProducts));
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

const fakeModel = <T>(collection: T[]): Readonly<InstanceModel> => {
  const methods = {
    find: (where: Partial<T>) => {
      return _.where(collection, where);
    },
    delete: (where: Partial<T>) => {
      const existingRecord = _.findWhere(collection, where) as T;

      collection = _.without(collection, existingRecord);

      return collection;
    },
  } as InstanceModel;

  return methods;
};
