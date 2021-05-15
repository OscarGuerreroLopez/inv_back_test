import { Router } from "express";

import meta from "./meta";
import inventory from "./inventory";
import products from "./products";

const router = Router();

// routes
router.use("/meta", meta);
router.use("/inventory", inventory);
router.use("/products", products);

export default router as Router;
