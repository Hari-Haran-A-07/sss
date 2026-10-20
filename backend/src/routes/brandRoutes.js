import express from "express";
import {
  createBrand,
  getBrands,
  deleteBrand,
  getBrandById,
} from "../controllers/brandController.js";

import { protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validateMiddleware.js";
import { validateCreateBrand } from "../validators/brandValidator.js";

const router = express.Router();

/* CREATE BRAND */
router.post("/", protect, validate(validateCreateBrand), createBrand);

/* GET ALL BRANDS */
router.get("/", protect, getBrands);

/* GET SINGLE BRAND */
router.get("/:id", protect, getBrandById);

/* DELETE BRAND */
router.delete("/:id", protect, deleteBrand);

export default router;
