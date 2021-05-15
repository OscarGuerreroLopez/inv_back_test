import { Router } from "express";

import meta from "./meta";

const router = Router();

// routes
router.use("/meta", meta);

export default router as Router;
