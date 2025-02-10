import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [process.env.FRONTEND_ADMIN_URL, process.env.FRONTEND_URL];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// allow cross-origin requests
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

import movieRoute from './routes/movie.routes.js'
app.use('/api/movies', movieRoute)

import seriesRoute from './routes/series.routes.js'
app.use('/api/series', seriesRoute)

import mixRoute from './routes/mix.routes.js'
app.use('/api/mix', mixRoute)

import userRoute from './routes/user.routes.js'
app.use('/api/auth', userRoute)


export default app;
