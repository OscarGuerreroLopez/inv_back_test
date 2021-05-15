import { Router } from "express";
import { GetInventory } from "../handlers/inventory";
import { QueryMiddleware } from "../middleware/query.middleware";

const router = Router();

router.get("/", QueryMiddleware, GetInventory);

export default router;
