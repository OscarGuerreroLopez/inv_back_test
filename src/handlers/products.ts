import { Handler, Response, Request } from "express";
import { validationResult } from "express-validator";
import { Logger, SanitiseBody } from "../utils";

export const DeleteProduct: Handler = async (
  request: Request,
  response: Response,
) => {
  //   const instance = DbAdapter();

  //   const model = await instance.collection("products").find(request.where);
  //   console.log("@@@111", model);

  //   const model2 = await instance.collection("products").delete(request.where);
  //   console.log("@@@222", model2);

  try {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      throw errors;
    }
    return response.send({
      message: "Delete Product",
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
