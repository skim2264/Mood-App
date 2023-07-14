import express from "express";
import * as moodController from "../controllers/moodController";
import { requiresAuth } from "../middleware/auth";

const router = express.Router();

//Get all moods and their images
router.get("/", moodController.getAllMoods);

//Get Recommendation based on mood
router.get("/:mood", moodController.getRec);

//Post Mood
router.post("/", requiresAuth, moodController.addMood);

export default router; 