//Connect db in mongoDB
// require ("dotenv").config({path:'./env'})   //this is generally used

import dotenv from "dotenv";
import connectDB from "./db/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { app } from "./app.js";
dotenv.config({ path: "./env" });
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed!!!", err);
  });

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

/*
// Connect db in mern 

import mongoose from "mongoose";
import { DB_NAME } from "../constants";

import express from "express";
const app = express();

(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", (error) => {
      console.log("ERR: ", error);
      throw error;
    });
    app.listen(process.env.PORT, () => {
      console.log(`App is listening at port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("ERROR: ", error);
    throw err;
  }
})();

*/
