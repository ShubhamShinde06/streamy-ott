import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: [process.env.FRONTEND_URL, process.env.FRONTEND_ADMIN_URL]
  
  })
);

import movieRoute from "./routes/movie.routes.js";
app.use("/api/movies", movieRoute);

import seriesRoute from "./routes/series.routes.js";
app.use("/api/series", seriesRoute);

import mixRoute from "./routes/mix.routes.js";
app.use("/api/mix", mixRoute);

import userRoute from "./routes/user.routes.js";
app.use("/api/auth", userRoute);

import savedRoute from "./routes/saved.routes.js";
app.use("/api/save", savedRoute);

export default app;
