export const DatabaseMethods = (
  database: Database,
): Readonly<{
  remove: (collection: string, where?: IObjectLiteral) => Promise<boolean>;
  find: <T>(collection: string, where?: IObjectLiteral) => Promise<T>;
}> => {
  const remove = async (collection: string, where: IObjectLiteral = {}) => {
    await database.collection(collection).delete(where);
    return true;
  };

  const find = async <T>(
    collection: string,
    where: IObjectLiteral = {},
  ): Promise<T> => {
    return await database.collection(collection).find(where);
  };

  return { remove, find };
};
