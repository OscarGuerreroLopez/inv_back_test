import { Handler, Response, Request } from "express";

export const GetInventory: Handler = (request: Request, response: Response) => {
  console.log("@@@where", request.where);

  return response.send({
    message: "Get Inventory",
    code: request.code,
  });
};
