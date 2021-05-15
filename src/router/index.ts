import { Router } from "express";

import meta from "./meta";
import inventory from "./inventory";

const router = Router();

// routes
router.use("/meta", meta);
router.use("/inventory", inventory);

export default router as Router;
