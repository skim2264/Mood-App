import { RequestHandler } from "express";

export const deleteMood: RequestHandler = async(req, res, next) => {
  //get mood in user moodsList and delete
  try {
    res.status(200);
  } catch (error) {
    next(error);
  }
};

export const editMood: RequestHandler = async(req, res, next) => {
  //get mood in user moodsList and edit
  try {
    res.status(200);
  } catch (error) {
    next(error);
  }
};

export const getMood: RequestHandler = async(req, res, next) => {
  //get mood in user moodsList and display
  try {
    res.status(200);
  } catch (error) {
    next(error);
  }
};



