import cookieParser from "cookie-parser";
import express from "express";
const app = express();

//Handle data coming from json
app.use(express.json({ limit: "16kb" }));

//Handle data coming from url
app.use(express.urlencoded({ extended: true, limit: "TRUE" }));
app.use(express.static("public"));

app.use(cookieParser());

export { app };
