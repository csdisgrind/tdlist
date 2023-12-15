// Buffer Line
import process from "process";
import expressSession from "express-session";
import { config } from "dotenv";

config();
const sessionSecret = process.env.SESSION_SECRET || "";

if (!sessionSecret) throw new Error("No SESSION_SECRET in dotenv");

const sessionDemo = expressSession({
  secret: sessionSecret,
  resave: true,
  saveUninitialized: true,
});

declare module "express-session" {
  interface SessionData {
    name: string;
  }
}

export default sessionDemo;
