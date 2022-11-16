import express, { Request, Response } from "express";

const app = express();

// connect a database
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
mongoose.connect(process.env.MONGODB_URI!);

// set up middleware
app.use(express.json());

// add our routes
app.get("*", (req: Request, res: Response) => {
  return res.json({ message: "Request received and returned." });
});

// listen
app.listen(process.env.PORT!, () => {
  console.log(`Server is listening on post ${process.env.PORT!}`);
});
