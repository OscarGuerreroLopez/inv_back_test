import { Router } from "express";
import asyncHandler from "express-async-handler";
import { GetInventory } from "../handlers/inventory";
import { QueryMiddleware } from "../middleware/query.middleware";

const router = Router();

router.get("/", QueryMiddleware, asyncHandler(GetInventory));

export default router;
