import { Handler, Response, Request } from "express";

export const GetInventory: Handler = async (
  request: Request,
  response: Response,
) => {
  return response.send({
    message: "Get Inventory",
    code: request.code,
  });
};
