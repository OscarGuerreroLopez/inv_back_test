import { Handler, Response, Request } from "express";
import { EnvVars } from "../utils";
import { version as __version } from "../../package.json";

export const getMeta: Handler = (request: Request, response: Response) => {
  return response.send({
    env: EnvVars.NODE_ENV,
    version: __version,
    code: request.code,
  });
};
