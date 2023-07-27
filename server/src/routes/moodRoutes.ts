import express from "express";
import * as moodController from "../controllers/moodController";
import { requiresAuth } from "../middleware/auth";

const router = express.Router();

//Get Recommendation based on mood
router.get("/:mood", moodController.getRec);

//Post Mood
router.post("/", requiresAuth, moodController.addMood);

export default router; 