export const DatabaseMethods = (
  database: Database,
): Readonly<{
  remove: (collection: string, where: IObjectLiteral) => Promise<boolean>;
  find: <T>(collection: string, where?: IObjectLiteral) => Promise<T>;
  findOne: <T>(collection: string, where: IObjectLiteral) => Promise<T>;
  updateOne: <T>(
    collection: string,
    where: IObjectLiteral,
    values: IObjectLiteral,
  ) => Promise<T>;
}> => {
  const remove = async (collection: string, where: IObjectLiteral) => {
    console.log(
      "@@@remove",
      await database.collection(collection).delete(where),
    );

    return await database.collection(collection).delete(where);
  };

  const find = async <T>(
    collection: string,
    where: IObjectLiteral = {},
  ): Promise<T> => {
    console.log("@@@find", await database.collection(collection).find(where));

    return await database.collection(collection).find(where);
  };

  const findOne = async <T>(
    collection: string,
    where: IObjectLiteral,
  ): Promise<T> => {
    console.log(
      "@@@findOne",
      await database.collection(collection).findOne(where),
    );

    return await database.collection(collection).findOne(where);
  };

  const updateOne = async (
    collection: string,
    where: IObjectLiteral = {},
    values: IObjectLiteral,
  ) => {
    const updatedRecord = await database
      .collection(collection)
      .updateOne(where, values);
    console.log("@@@updateOne", updatedRecord);

    return updatedRecord;
  };

  return { remove, find, updateOne, findOne };
};
