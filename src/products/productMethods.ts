export const ProductMethods = async (database: Database) => {
  const remove = async (collection: string, where: IObjectLiteral = {}) => {
    await database.collection(collection).delete(where);
  };

  return Object.freeze({ remove });
};
