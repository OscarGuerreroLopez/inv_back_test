import { FindProduct, Products } from "../products";
const data = [
  {
    name: "Dining Table",
    contain_articles: [
      {
        art_id: "1",
        amount_of: "4",
        name: "",
      },
      {
        art_id: "2",
        amount_of: "8",
        name: "",
      },
      {
        art_id: "4",
        amount_of: "1",
        name: "",
      },
    ],
  },
];

jest.mock("../db/databaseMethods.ts", () => {
  const DatabaseMethods = (): Readonly<{
    find: (collection: string, where?: IObjectLiteral) => Promise<Products>;
  }> => {
    const find = async (): Promise<Products> => {
      return data as Products;
    };

    return { find };
  };

  return { DatabaseMethods };
});

describe("findProduct test", () => {
  it("should return true", async () => {
    try {
      const result = await FindProduct({ name: "Dining Table" });
      expect(result).toStrictEqual(data);
    } catch (error) {
      throw error;
    }
  });
});
