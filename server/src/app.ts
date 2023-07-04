import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import moodRoutes from "./routes/moodRoutes";
import userRoutes from "./routes/userRoutes";
import profileRoutes from "./routes/profileRoutes";
import createHttpError, { isHttpError } from "http-errors";
import { importData } from "./seedData";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

//routes
app.use("/api/mood", moodRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/user", userRoutes);

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