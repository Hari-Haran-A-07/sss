import upload from "../middleware/uploadMiddleware.js";
import express from "express";
import {
  createPost,
  getPosts,
  getPost,
  deletePost,
  retryPost,
  reschedulePost,
  updatePost,
  togglePostStatus,
} from "../controllers/postController.js";

import { protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validateMiddleware.js";
import { validateCreatePost, validateUpdatePost } from "../validators/postValidator.js";

const router = express.Router();

/* CREATE */
router.post(
  "/",
  protect,
  upload.array("media"),
  validate(validateCreatePost),
  createPost
);

/* GET */
router.get("/brand/:brandId", protect, getPosts);
router.get("/:id", protect, getPost);

/* DELETE */
router.delete("/:id", protect, deletePost);

/* UPDATE */
router.put("/:id", protect, validate(validateUpdatePost), updatePost);

/* TOGGLE STATUS */
router.patch("/:id/toggle-status", protect, togglePostStatus);

/* RETRY & RESCHEDULE */
router.post("/:id/retry", protect, retryPost);
router.put("/:id/reschedule", protect, reschedulePost);

export default router;
