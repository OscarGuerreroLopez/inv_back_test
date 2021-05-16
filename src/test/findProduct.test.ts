import { FindProduct, Products } from "../products";
const data = [
  {
    name: "Dining Table",
    contain_articles: [
      {
        art_id: "1",
        amount_of: "4",
      },
      {
        art_id: "2",
        amount_of: "8",
      },
      {
        art_id: "4",
        amount_of: "1",
      },
    ],
  },
];

jest.mock("../db/databaseMethods.ts", () => {
  const DatabaseMethods = (): Readonly<{
    find: <T>(collection: string, where?: IObjectLiteral) => Promise<T>;
  }> => {
    const find = async <T>(): Promise<T> => {
      return data as unknown as T;
    };

    return { find };
  };

  return { DatabaseMethods };
});

describe("findProduct test", () => {
  it("should return true", async () => {
    try {
      const result = await FindProduct<Products>({ name: "Dining Table" });
      expect(result).toBe(data);
    } catch (error) {
      throw error;
    }
  });
});
