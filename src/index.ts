import express, { Request, Response } from "express";
import User from "./models/UserModel";

const app = express();

// connect a database
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
mongoose.connect(process.env.MONGODB_URI!);

// set up middleware
app.use(express.json());

// add our routes

app.get("/user", async (req: Request, res: Response) => {
  try {
    await User.create({ email: "email@email.com", password: "testpassword" });
    return res.json({ message: "User created." });
  } catch (error) {
    return res.json({ error: error });
  }
});

app.get("*", (req: Request, res: Response) => {
  return res.json({ message: "Request received and returned." });
});

// listen
app.listen(process.env.PORT!, () => {
  console.log(`Server is listening on post ${process.env.PORT!}`);
});
