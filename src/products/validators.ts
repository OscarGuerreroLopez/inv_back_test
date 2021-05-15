import { query } from "express-validator";

export const DeleteProductValidator = [
  query("where").exists().withMessage("Missing where query param"),
];
