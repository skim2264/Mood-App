import { RequestHandler } from "express";

export const signup: RequestHandler = async(req, res, next) => {
  try {
    res.status(200);
  } catch (error) {
    next(error);
  }
};

export const login: RequestHandler = async(req, res, next) => {
  try {
    res.status(200);
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = async(req, res, next) => {
  try {
    res.status(200);
  } catch (error) {
    next(error);
  }
};