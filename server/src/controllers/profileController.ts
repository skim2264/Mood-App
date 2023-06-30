import { RequestHandler } from "express";

export const deleteMood: RequestHandler = async(req, res, next) => {
  try {
    res.status(200);
  } catch (error) {
    next(error);
  }
};

export const editMood: RequestHandler = async(req, res, next) => {
  try {
    res.status(200);
  } catch (error) {
    next(error);
  }
};

export const getMood: RequestHandler = async(req, res, next) => {
  try {
    res.status(200);
  } catch (error) {
    next(error);
  }
};



