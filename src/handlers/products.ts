import { Handler, Response, Request } from "express";
import { validationResult } from "express-validator";
import { Logger, SanitiseBody } from "../utils";
import { ProductsList } from "../products";

export const DeleteProduct: Handler = async (
  request: Request,
  response: Response,
) => {
  try {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      throw errors;
    }
    const where = (request.where as IObjectLiteral) || {};
    const products = await ProductsList();

    const removedProduct = await products.removeProduct(where);

    return response.send({
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
