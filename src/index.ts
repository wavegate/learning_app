import express, { Request, Response } from "express";
import User from "./models/UserModel";
import cors from "cors";

const app = express();

// connect a database
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
mongoose.connect(process.env.MONGODB_URI!);

// listen
const server = app.listen(process.env.PORT!, () => {
  console.log(`Server is listening on post ${process.env.PORT!}`);
});

import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

const io = new Server(server, {
  cors: {
    origin: [
      "https://elegant-cupcake-589d5a.netlify.app",
      "http://localhost:3000",
    ],
    credentials: true,
  },
});

let socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
io.on("connection", (iosocket) => {
  socket = iosocket;
});
export { socket };

// set up middleware
app.use(
  cors({
    origin: [
      "https://elegant-cupcake-589d5a.netlify.app",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);
app.use(express.json());

// add our routes

app.get("/user", async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    return res.json({ users: users });
  } catch (error) {
    return res.json({ error: error });
  }
});

app.post("/user", async (req: Request, res: Response) => {
  try {
    await User.create({ email: "email@email.com", password: "testpassword" });
    socket.emit("new user");
    socket.broadcast.emit("new user");
    return res.json({ message: "User created." });
  } catch (error) {
    return res.json({ error: error });
  }
});

app.delete("/user", async (req: Request, res: Response) => {
  try {
    await User.deleteMany({});
    socket.emit("new user");
    socket.broadcast.emit("new user");
    return res.json({ message: "Users deleted." });
  } catch (error) {
    return res.json({ error: error });
  }
});

app.get("*", (req: Request, res: Response) => {
  return res.json({ message: "Request received and returned." });
});
