import express from "express";

import { EnvVars } from "./utils";

import cors from "cors";
import helmet from "helmet";

import * as middleware from "./middleware";
import Router from "./router";

import { Logger } from "./utils";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ credentials: true, origin: true }));
app.use(helmet());

app.use(middleware.LoggerMiddleware);
app.use("/", Router);
app.use("*", middleware.NotFoundMiddleware);

app.use(middleware.errorMiddleware);

process.on("uncaughtException", (e: any) => {
  Logger.error(e.message || "uncaughtException", {
    message: "uncaughtException",
    error: {
      message: e.message || "no error message",
      stack: e.stack || "no stack",
    },
  });

  Logger.on("finish", () => process.exit(1));

  setTimeout(() => {
    Logger.end();
  }, 2000);
});

process.on("unhandledRejection", (e: any) => {
  Logger.error(e.message || "unhandledRejection", {
    message: "unhandledRejection",
    error: {
      message: e.message || "no error message",
      stack: e.stack || "no stack",
    },
  });

  Logger.on("finish", () => process.exit(1));

  setTimeout(() => {
    Logger.end();
  }, 2000);
});

app.listen(EnvVars.PORT, () => {
  Logger.info(`Server is running http://localhost:${EnvVars.PORT}...`);
});
