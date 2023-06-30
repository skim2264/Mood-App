import { RequestHandler } from "express";

export const addMood: RequestHandler = async(req, res, next) => {
  try {
    res.status(200);
  } catch (error) {
    next(error);
  }
};

export const getRec: RequestHandler = async(req, res, next) => {
  try {
    res.status(200);
  } catch (error) {
    next(error);
  }
};

