import { RequestHandler } from "express";
import UserMoodModel from "../models/user_mood";
import AdviceModel from "../models/advice";
import QuoteModel from "../models/quote";
import SongModel from "../models/song";
import UserModel from "../models/user";
import createHttpError from "http-errors";
import { assertIsDefined } from "../util/assertIsDefined";
import { getRandomInt } from "../util/randomNum";

//get random recommendation based on chosen mood
export const getRec: RequestHandler = async(req, res, next) => {
  let rec = {};

  //get random number to help pick random recommendation
  const randomInt = getRandomInt(3);

  //randomly pick from which list to get recommended list and pick randomly from list
   if (randomInt == 0) {
    const adviceList = await AdviceModel.find({mood: req.params.mood}).exec();
    rec = adviceList[getRandomInt(adviceList.length)];
  } else if (randomInt == 1) {
    const quoteList = await QuoteModel.find({mood: req.params.mood}).exec();
    rec = quoteList[getRandomInt(quoteList.length)];
  } else if (randomInt == 2) {
    const songList = await SongModel.find({mood: req.params.mood}).exec();
    rec = songList[getRandomInt(songList.length)];
  } 

  try {
    res.status(200).json(rec);
  } catch (error) {
    next(error);
  }
};

interface addTodayMood {
  mood?: string,
}

//add mood to user moods list
export const addMood: RequestHandler<unknown, unknown, addTodayMood, unknown> = async(req, res, next) => {
  const authenticatedUserId = req.session.userId;

  const day = Date.now();
  const mood = req.body.mood;

  //get user and append todayMood to moodsList
  try {
    assertIsDefined(authenticatedUserId);

    if (!mood) {
      throw createHttpError(400);
    }
    
    //create user_mood in mongoose
    const todayMood = await UserMoodModel.create({
      userId: authenticatedUserId,
      day: day,
      mood: mood,
    });

    //get user and add user_mood to moodslist
    const user = await UserModel.findById(authenticatedUserId).exec();
    user?.moodsList.push(todayMood.day);
    await user?.save();

    res.status(201).json(todayMood);
  } catch (error) {
    next(error);
  }
};
