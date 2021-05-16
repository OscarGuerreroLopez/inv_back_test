import { Handler, Response, Request } from "express";
import { GetInventory as getInventoryService } from "../inventory";
import { Logger, SanitiseBody } from "../utils";

export const GetInventory: Handler = async (
  request: Request,
  response: Response,
) => {
  try {
    const where = (request.where as IObjectLiteral) || {};

    const inventory = await getInventoryService(where);

    return response.send(inventory);
  } catch (error) {
    const status = error.status || 500;
    const message = error.message || "Error getting the Inventory";

    Logger.warn(message, {
      identifier: "GetInventory handler",
      status,
      error,
      code: request.code,
      body: SanitiseBody(request.body),
      headers: request.headers,
    });

    return response.status(status).send({
      message,
      errorCode: request.code,
    });
  }
};
