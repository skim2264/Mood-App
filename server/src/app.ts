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
import compression from "compression";
import helmet from "helmet";
import RateLimit from "express-rate-limit";

const app = express();

app.use(morgan("dev"));

app.use(helmet());
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
});

app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: ["https://mood-app-production.up.railway.app", "http://localhost:3000"],
  credentials: true,
}));

app.set('trust proxy', 1);

app.use(session({
  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    path: '/',
    maxAge: 60 * 60 * 1000,
    secure: process.env.NODE_ENV === 'development' ? false : true,
    httpOnly: process.env.NODE_ENV === 'development' ? false : true,
    sameSite: process.env.NODE_ENV === 'development' ? false : 'none',
  },
  store: MongoStore.create({
    mongoUrl: env.MONGO_URI
  })
}));

app.use(compression());

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