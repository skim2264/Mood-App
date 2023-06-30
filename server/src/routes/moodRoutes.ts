import express from "express";
import * as moodController from "../controllers/profileController";

const router = express.Router();

//Get Recommendation based on mood
router.get("/:mood", moodController.getRec);

//Post Mood
router.post("/:mood", moodController.addMood);

export default router; 