import { SanitiseBody } from "../utils";
import { NextFunction, Request, Response } from "express";

import HttpException from "../exceptions/HttpException";
import { Logger } from "../utils/logger";

export const errorMiddleware = (
  error: HttpException,
  request: Request,
  response: Response,
  _next: NextFunction,
): void => {
  const message = error.message || "Something went wrong";
  const code = request.code;

  Logger.error(message, {
    identifier: "ErrorMiddleware",
    message,
    error,
    code,
    body: SanitiseBody(request.body),
    headers: request.headers,
  });

  response.status(500).send({
    message: "Something went wrong, check logs",
    code,
  });
};
export default errorMiddleware;
