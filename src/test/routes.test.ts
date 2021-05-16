import { mockReq, mockRes } from "sinon-express-mock";

import { version as __version } from "../../package.json";

import { getMeta } from "../handlers/meta";
import { GetInventory } from "../handlers/inventory";
import { EnvVars } from "../utils/validateEnv";

const data = [
  { art_id: "1", name: "legxxx", stock: "12" },
  { art_id: "2", name: "screwxxx", stock: "17" },
  { art_id: "3", name: "seatxxx", stock: "2" },
  { art_id: "4", name: "table topxxx", stock: "1" },
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

describe("meta", () => {
  const next = () => null;
  let req: ReturnType<typeof mockReq>;
  let res: ReturnType<typeof mockRes>;
  let body: any;

  beforeEach(() => {
    req = mockReq();
    res = mockRes({
      send: (data: any) => {
        body = data;
      },
    });
  });

  describe("getMeta()", () => {
    it("should send meta", async () => {
      await getMeta(req, res, next);
      expect(body).toBeDefined();
      expect(body.version).toBe(__version);
      expect(body.env).toBe(EnvVars.NODE_ENV);
    });
  });
});

describe("find inventory", () => {
  const next = () => null;
  let request: ReturnType<typeof mockReq>;
  let response: ReturnType<typeof mockRes>;
  let body: any;
  let status: any;

  afterAll(async (done) => {
    done();
  });

  beforeEach(() => {
    const req = {
      user: "1234dgg",
      code: "123405",
      brand: "pharmaco_surveillance",
      headers: { user: "122333" },
      query: { keyParent: "form", typeName: "filter", enabled: "true" },
    };

    request = mockReq(req);
    response = mockRes({
      send: (data: any) => (body = data),
      status: (data: any) => {
        status = data;
        return response;
      },
    });
  });

  it("should return 200", async () => {
    await GetInventory(request, response, next);
    expect(status).toBe(200);
    expect(body).toBeDefined();
    expect(body).toBe(data);
  });
});
