import { Request, Response } from "express";
import { SanitiseBody } from "../utils";
import { Logger } from "../utils/logger";

export const NotFoundMiddleware = (
  request: Request,
  response: Response,
): Response => {
  const message = `path not found ${request.url}`;

  Logger.warn(message, {
    identifier: "notFoundMiddleware",
    code: request.code,
    body: SanitiseBody(request.body),
    headers: request.headers,
  });

  return response.status(404).json({ message: request.code });
};
