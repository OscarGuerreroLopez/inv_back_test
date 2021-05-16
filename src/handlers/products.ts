import { Handler, Response, Request } from "express";
import { validationResult } from "express-validator";
import { Logger, SanitiseBody } from "../utils";
import { RemoveProduct as removeProductService } from "../products";

export const RemoveProduct: Handler = async (
  request: Request,
  response: Response,
) => {
  try {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      throw errors;
    }
    const where = (request.where as IObjectLiteral) || {};

    const removedProduct = await removeProductService(where);

    return response.status(200).send({
      message: removedProduct,
      code: request.code,
    });
  } catch (error) {
    const status = error.status || 400;
    let message = "";
    if (error.errors) {
      error.errors.map((e: IObjectLiteral) => {
        message += `${e.msg || ""} ,`;
      });
    } else {
      message = error.message || "Error deleting products";
    }

    Logger.warn(message, {
      identifier: "DeleteProduct handler",
      status,
      error: {
        message,
        stack: error.stack || "no stack",
      },
      code: request.code,
      body: SanitiseBody(request.body),
      headers: request.headers,
    });

    return response.status(status).send({
      message: "Cannot process your request, check logs",
      errorCode: request.code,
    });
  }
};
