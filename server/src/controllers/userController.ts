import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import bcrypt from "bcrypt";

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.session.userId).exec();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

interface SignUpBody {
  firstname?: string,
  lastname?: string,
  username?: string,
  password?: string
}

export const signup: RequestHandler<unknown, unknown, SignUpBody, unknown> = async(req, res, next) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const username = req.body.username;
  const password = req.body.password;

  try {
    if (!firstname || !username || !password) {
      throw createHttpError(400, "Parameters missing");
    }

    //check if username exists
    const existingUsername = await UserModel.findOne({username:username}).exec();
    if (existingUsername) {
      throw createHttpError(409, "Username already taken. Please choose a different one or login instead");
    }

    const passwordHashed = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: passwordHashed
    });

    req.session.userId = newUser._id;

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

interface LoginBody {
  username?: string,
  password?: string,
}

export const login: RequestHandler<unknown, unknown, LoginBody, unknown> = async(req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  try { 
    if (!username || !password) {
      throw createHttpError(400, "Parameters missing");
    }

    //find username in database
    const user = await UserModel.findOne({username:username}).select("+password").exec();
    if (!user) {
      throw createHttpError(401, "Invalid credentials.");
    }

    //check if passwords match with bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw createHttpError(401, "Invalid credentials.");
    }

    req.session.userId = user._id;

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = async(req, res, next) => {
  req.session.destroy(error => {
    if (error) {
      next(error);
    } else {
      res.sendStatus(200);
    }
  })
};