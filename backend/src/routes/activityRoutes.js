import express from "express";
import { getBrandActivities } from "../controllers/activityController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/brand/:brandId", protect, getBrandActivities);

export default router;
