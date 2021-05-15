import { Handler, Response, Request } from "express";
import { DbAdapter } from "../utils/db";

export const DeleteProduct: Handler = (
  request: Request,
  response: Response,
) => {
  const instance = DbAdapter();
  const model = instance.get("products").find(request.where);

  console.log("@@@222", model);

  const model2 = instance.get("products").delete(request.where);
  console.log("@@@222", model2);

  return response.send({
    message: "Delete Product",
    code: request.code,
  });
};
