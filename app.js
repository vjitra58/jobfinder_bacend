import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import ErrorMiddleware from "./middlewares/Error.js";


const app =  express();
dotenv.config({path: "./config/config.env"});
//use middle wares;
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//use routes
import UserRoute from "./routes/userRoutes.js";
import JobRoute from "./routes/jobRoutes.js";

app.use("/api/v1/", UserRoute);
app.use("/api/v1/", JobRoute);

export default app;

app.use(ErrorMiddleware);
