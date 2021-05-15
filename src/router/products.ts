import { Router } from "express";
import { DeleteProduct } from "../handlers/products";
import { QueryMiddleware } from "../middleware/query.middleware";

const router = Router();

router.delete("/", QueryMiddleware, DeleteProduct);

export default router;
