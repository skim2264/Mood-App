import { RequestHandler } from "express";
import { assertIsDefined } from "../util/assertIsDefined";
import UserModel from "../models/user";

export const deleteMood: RequestHandler = async(req, res, next) => {
  //get mood in user moodsList and delete
  const authenticatedUserId = req.session.userId;
  try {
    assertIsDefined(authenticatedUserId);
    res.status(200);
  } catch (error) {
    next(error);
  }
};

export const editMood: RequestHandler = async(req, res, next) => {
  //get mood in user moodsList and edit
  const authenticatedUserId = req.session.userId;
  try {
    assertIsDefined(authenticatedUserId);
    res.status(200);
  } catch (error) {
    next(error);
  }
};

export const getMood: RequestHandler = async(req, res, next) => {
  //get mood in user moodsList and display
  const authenticatedUserId = req.session.userId;
  try {
    assertIsDefined(authenticatedUserId);
    //const user = await UserModel.findById(req.session.userId).exec();
    //const moodsList;
    res.status(200);
  } catch (error) {
    next(error);
  }
};



