import express from "express";
import * as profileController from "../controllers/profileController";

const router = express.Router();

//Delete Mood
router.delete("/", profileController.deleteMood);

//Edit Mood
router.put("/", profileController.editMood);

//Get Mood
router.get("/:date", profileController.getMood);

export default router; 