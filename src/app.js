import cookieParser from "cookie-parser";
import express from "express";
const app = express();

//Handle data coming from json
app.use(express.json({ limit: "16kb" }));

//Handle data coming from url
app.use(express.urlencoded({ extended: true, limit: "TRUE" }));
app.use(express.static("public"));

app.use(cookieParser());

//routes import
import userRouter from "./routes/user.routes.js";

//routes declaration
app.use("/api/v1/users", userRouter);
//this will direct routes to https://localhost:8000/api/v1/users/register

export { app };
