import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import moodRoutes from "./routes/moodRoutes";
import userRoutes from "./routes/userRoutes";
import profileRoutes from "./routes/profileRoutes";
import createHttpError, { isHttpError } from "http-errors";
import { importData } from "./seedData";
import session from "express-session";
import env from "./util/validateEnv";
import MongoStore from "connect-mongo";
import { requiresAuth } from "./middleware/auth";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use(cors());

app.use(session({
  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 120 * 60 * 1000,
  },
  rolling: true,
  store: MongoStore.create({
    mongoUrl: env.MONGO_URI
  })
}))

//routes
app.use("/api/mood", moodRoutes);
app.use("/api/profile", requiresAuth, profileRoutes);
app.use("/api/users", userRoutes);

//Error if endpoint is not found
app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

//Error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res:Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "An unknown error occurred";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({error: errorMessage});
})

//importData();

export default app;