import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  likePost,
} from "../controllers/post.controllers.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/post", verifyToken, getUserPosts);

router.patch("/:id/like", verifyToken, likePost);

export default router;
