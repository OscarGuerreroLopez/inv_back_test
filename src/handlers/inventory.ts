import { Handler, Response, Request } from "express";

export const GetInventory: Handler = (request: Request, response: Response) => {
  console.log("@@@where", request.where);
  console.log("@@@sort", request.sort);

  return response.send({
    message: "Get Inventory",
    code: request.code,
  });
};
