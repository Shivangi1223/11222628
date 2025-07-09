import express from "express";
import {
  shortenUrl,
  redirect,
  getAllStats,
} from "../controllers/urlController.js";

const router = express.Router();

router.post("/shorten", shortenUrl);       // POST short URLs
router.get("/r/:code", redirect);          // Redirect to original
router.get("/stats", getAllStats);         // Fetch all stats

export default router;
