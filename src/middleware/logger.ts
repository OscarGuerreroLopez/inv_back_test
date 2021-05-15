import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";

import { Logger } from "../utils";
import { DbAdapter } from "../utils/db";
import { SanitiseBody } from "../utils";

export const LoggerMiddleware = (
  request: Request,
  _response: Response,
  next: NextFunction,
): void => {
  try {
    const message = `Method: ${request.method}, path: ${request.path}, host:${request.hostname}`;

    request.code = uuidv4();

    Logger.info(message, {
      identifier: "LoggerMiddleware",
      code: request.code,
      body: SanitiseBody(request.body),
      headers: request.headers,
    });
    next();
  } catch (error) {
    const status = 500;
    const message = error.message || "no error message";

    Logger.warn(message, {
      identifier: "LoggerMiddleware",
      status,
      error,
      code: request.code,
    });

    next();
  }
};
