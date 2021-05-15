import * as winston from "winston";
import { EnvVars } from "./validateEnv";
import { NodeEnvEnum } from "../config";

const { combine, timestamp, prettyPrint } = winston.format;

export const Logger = winston.createLogger({
  // level: "info",
  format: combine(timestamp(), prettyPrint()),

  // in a more professional app this will be logged to elasticsearch (kibana) or something alike
  // for this test we just log into a file

  transports: [
    new winston.transports.File({
      filename: "./logs/info.log",
      level: "info",
    }),
    new winston.transports.File({
      filename: "./logs/warn.log",
      level: "warn",
    }),
    new winston.transports.File({
      filename: "./logs/error.log",
      level: "error",
    }),
  ],
});

Logger.on("error", (error) => {
  console.error("!!!!!!!!!!!!!!!!Error caught", error);
});

if (EnvVars.NODE_ENV === NodeEnvEnum.DEVELOPMENT) {
  Logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}
