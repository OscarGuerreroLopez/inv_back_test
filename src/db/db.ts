// fake implementation of a db adapter, for example mongo
// with mongoose models
import _ from "underscore";
import { inventory as originalInventory } from "../config/fakeDb/inventory.json";
import { products as originalProducts } from "../config/fakeDb/products.json";

interface InstanceModel {
  find: <T>(where: Partial<T>) => T[];
  findOne: <T>(where: Partial<T>) => T;
  delete: <T>(where: Partial<T>) => boolean;
  updateOne: <T>(where: Partial<T>, values: IObjectLiteral) => T;
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
      const result = _.where(collection, where);

      return Object.assign([], result); // just to make sure noone alters the original value
    },
    findOne: (where: Partial<T>) => {
      const result = _.findWhere(collection, where);

      return Object.assign({}, result); // just to make sure noone alters the original value
    },
    delete: (where: Partial<T>) => {
      const existingRecord = _.findWhere(collection, where) as T;

      if (!existingRecord) {
        return false;
      }

      collection = _.without(collection, existingRecord);

      return true;
    },
    updateOne: (where: Partial<T>, values: IObjectLiteral) => {
      let item = _.findWhere(collection, where) as T;

      item = { ...item, ...values };

      const result = _.extend(_.findWhere(collection, where), item);

      return result;
    },
  } as InstanceModel;

  return methods;
};
