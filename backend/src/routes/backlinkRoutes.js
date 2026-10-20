import express from "express";
import {
  createBacklink,
  getBacklinks,
  getBacklink,
  updateBacklink,
  deleteBacklink,
} from "../controllers/backlinkController.js";

import { protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validateMiddleware.js";
import {
  validateCreateBacklink,
  validateUpdateBacklink,
} from "../validators/backlinkValidator.js";

const router = express.Router();

router.post("/", protect, validate(validateCreateBacklink), createBacklink);

router.get("/brand/:brandId", protect, getBacklinks);

router.get("/:id", protect, getBacklink);

router.put("/:id", protect, validate(validateUpdateBacklink), updateBacklink);

router.delete("/:id", protect, deleteBacklink);

export default router;
