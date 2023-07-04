import { RequestHandler } from "express";
import MoodModel from "../models/mood";
import UserMoodModel from "../models/user_mood";
import createHttpError from "http-errors";

export const getAllMoods: RequestHandler = async(req, res, next) => {
  try {
    const moods = await MoodModel.find().exec();
    res.status(200).json(moods);
  } catch (error) {
    next(error);
  }
};

export const getRec: RequestHandler = async(req, res, next) => {
  try {
    res.status(200).json("happy");
  } catch (error) {
    next(error);
  }
};

interface addTodayMood {
  day?: string,
  mood?: string,
}

export const addMood: RequestHandler<unknown, unknown, addTodayMood, unknown> = async(req, res, next) => {
  const day = req.body.day;
  const mood = req.body.mood;

  //get user and append todayMood to moodsList
  try {
    if (!mood || !day) {
      throw createHttpError(400);
    }
    const todayMood  = await MoodModel.create({
      day: day,
      mood: mood,
    })
    res.status(201).json(todayMood);
  } catch (error) {
    next(error);
  }
};
