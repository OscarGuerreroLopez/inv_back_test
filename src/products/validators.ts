import { query } from "express-validator";

export const RemoveProductValidator = [
  query("where").exists().withMessage("Missing where query param"),
];
