import { Router } from "express";
import asyncHandler from "express-async-handler";
import { DeleteProduct } from "../handlers/products";
import { QueryMiddleware } from "../middleware/query.middleware";
import { DeleteProductValidator } from "../products";

const router = Router();

router.delete(
  "/",
  DeleteProductValidator,
  QueryMiddleware,
  asyncHandler(DeleteProduct),
);

export default router;
