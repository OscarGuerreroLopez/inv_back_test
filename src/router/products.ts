import { Router } from "express";
import asyncHandler from "express-async-handler";
import { RemoveProduct } from "../handlers/products";
import { QueryMiddleware } from "../middleware/query.middleware";
import { RemoveProductValidator } from "../products";

const router = Router();

router.delete(
  "/",
  RemoveProductValidator,
  QueryMiddleware,
  asyncHandler(RemoveProduct),
);

export default router;
