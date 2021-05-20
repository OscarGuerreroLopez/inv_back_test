// I have used this middleware in other projects I have for pagination, sorting, and adding where clauses
// in this test app I only use where, but since I already had it I just dump it in here, not like I over did it
import { NextFunction, Request, Response } from "express";

import { Logger } from "../utils/logger";

export const QueryMiddleware = (
  request: Request,
  _response: Response,
  next: NextFunction,
): void => {
  try {
    const limitQuery = request.query.limit as string;
    const skipQuery = request.query.skip as string;
    const sortQuery = request.query.sort;
    const whereQuery = request.query.where;

    // 1. Convert limit and skip to number
    let limit = parseInt(limitQuery) || 25;
    const skip = parseInt(skipQuery) || 0;

    // 2. Validate limit to make sure it's not causing performance issues
    limit = limit > 25 ? 25 : limit;

    request.limit = limit;
    request.skip = skip;
    request.sort = sortValuesFunc(sortQuery);
    request.where = whereValuesFunc(whereQuery);

    next();
  } catch (error) {
    Logger.warn("Error processing de query options", {
      error: {
        message: error.message || "no error message",
        stack: error.stack || "no stack",
      },
    });
    next();
  }
};

const sortValuesFunc = (
  sortQuery: { [s: string]: unknown } | ArrayLike<unknown> | undefined,
) => {
  let sortValues: IObjectLiteral = {};
  if (typeof sortQuery === "object") {
    const sorts = Object.entries(sortQuery);

    const sort: IObjectLiteral = sorts.reduce(
      (obj, [key, order]) => ({
        ...obj,
        [key]: parseInt(order as string) || order || -1,
      }),
      {},
    );

    Object.keys(sort).forEach((item) => {
      sortValues = { ...sortValues, ...sort[item] };
    });
  } else if (typeof sortQuery === "string") {
    sortValues = { [sortQuery]: -1 };
  }

  return sortValues;
};

const whereValuesFunc = (
  whereQuery: ArrayLike<unknown> | { [s: string]: unknown } | undefined,
) => {
  let where: IObjectLiteral = {};
  if (typeof whereQuery === "object") {
    const wheres = Object.entries(whereQuery);

    where = wheres.reduce(
      (obj, [key, order]) => ({
        ...obj,
        [key]: parseInt(order as string) || order || -1,
      }),
      {},
    );
  }

  let whereValues: IObjectLiteral = {};

  Object.keys(where).forEach((item) => {
    let newKeyValue = where[item];
    Object.keys(where[item]).forEach((keyItem) => {
      if (newKeyValue[keyItem].toString().toLowerCase() === "true") {
        newKeyValue = { [keyItem]: true };
      }
      if (newKeyValue[keyItem].toString().toLowerCase() === "false") {
        newKeyValue = { [keyItem]: false };
      }
    });

    whereValues = { ...whereValues, ...newKeyValue };
  });

  return whereValues;
};
