export const DatabaseMethods = (
  database: Database,
): Readonly<{
  remove: (collection: string, where?: IObjectLiteral) => Promise<boolean>;
  find: (collection: string, where?: IObjectLiteral) => Promise<any>;
}> => {
  const remove = async (collection: string, where: IObjectLiteral = {}) => {
    await database.collection(collection).delete(where);
    return true;
  };

  const find = async (collection: string, where: IObjectLiteral = {}) => {
    return await database.collection(collection).find(where);
  };

  return Object.freeze({ remove, find });
};
