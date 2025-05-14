import { Router } from "express";
import { getTree } from "../controllers/tree.controller";
import { catchAsync } from "../utils/catchAsync";

const router = Router();

/**
 * @openapi
 * /api/v1/tree:
 *   get:
 *     description: Get consolidated Todoist project tree
 *     responses:
 *       200:
 *         description: JSON structure of projects > sections > tasks > comments
 */
router.get("/tree", catchAsync(getTree));

export default router;
