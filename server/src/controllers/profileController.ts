import { RequestHandler } from "express";
import { assertIsDefined } from "../util/assertIsDefined";
import UserModel from "../models/user";
import UserMoodModel from "../models/user_mood";
import { endOfDay, endOfMonth, startOfDay, startOfMonth } from "date-fns";
import createHttpError from "http-errors";

export const deleteMood: RequestHandler = async(req, res, next) => {
  const date = new Date(req.params.date);

  const authenticatedUserId = req.session.userId;

  try {
    assertIsDefined(authenticatedUserId);

    const mood = await UserMoodModel.findOneAndDelete({userId: authenticatedUserId, day: {$gte: startOfDay(date), $lte: endOfDay(date)}}).exec();

    if (!mood) {
      throw createHttpError(400, "No mood chosen for this date.");
    }

    res.status(200).json(mood);
  } catch (error) {
    next(error);
  }
};

interface updateMoodParams {
  date: string,
}

interface updateMoodBody {
  mood?: string,
}
  
export const editMood: RequestHandler<updateMoodParams, unknown, updateMoodBody, unknown> = async(req, res, next) => {
  const date = new Date(req.params.date);
  const newMood = req.body.mood

  const authenticatedUserId = req.session.userId;

  try {
    assertIsDefined(authenticatedUserId);

    const mood = await UserMoodModel.findOneAndUpdate({userId: authenticatedUserId, day: {$gte: startOfDay(date), $lte: endOfDay(date)}}, {mood: newMood}).exec();

    if (!mood) {
      throw createHttpError(400, "No mood chosen for this date.");
    }

    res.status(200).json(mood);
  } catch (error) {
    next(error);
  }
};

/* export const getMoodByDate: RequestHandler = async(req, res, next) => {
  const date = new Date(req.params.date);

  const authenticatedUserId = req.session.userId;
  try {
    assertIsDefined(authenticatedUserId);

    //get mood from specific date for user
    const mood = await UserMoodModel.find({userId: authenticatedUserId, day: {$gte: startOfDay(date), $lte: endOfDay(date)}}).exec();
  
    if (!mood) {
      throw createHttpError(400, "No mood chosen for this date.");
    }
    //const moodsList;
    res.status(200).json(mood);
  } catch (error) {
    next(error);
  }
}; */

export const getMoodByMonth: RequestHandler = async(req, res, next) => {
  const date = new Date(req.params.date);
  const authenticatedUserId = req.session.userId;

  try {
    assertIsDefined(authenticatedUserId);

    //get mood from specific date for user
    const mood = await UserMoodModel.find({userId: authenticatedUserId, day: {$gte: startOfMonth(date), $lte: endOfMonth(date)} }).exec();

    if (!mood) {
      throw createHttpError(400, "No mood chosen for this date.");
    }
    //const moodsList;
    res.status(200).json(mood);
  } catch (error) {
    next(error);
  }
};


