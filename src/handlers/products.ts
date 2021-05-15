import { Handler, Response, Request } from "express";

export const DeleteProduct: Handler = (
  request: Request,
  response: Response,
) => {
  console.log("@@@where", request.where);
  console.log("@@@sort", request.sort);

  return response.send({
    message: "Delete Product",
    code: request.code,
  });
};
