import express, { Request, Response } from "express";
// import fs from "fs";

import authGuard from "./utils-demo/authGuard";
import sessionDemo from "./utils-demo/sessionDemo";

import userRouterDemo from "./router-demo/userRouterDemo";
import todoRouterDemo from "./router-demo/todoRouterDemo";

const app = express();

app.use(express.json());
app.use(sessionDemo);
app.use(express.static("public-demo"));

app.use("/user", userRouterDemo);
app.use("/todo", authGuard, todoRouterDemo);

app.get("/", (_req: Request, res: Response) => res.send("index.html"));

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
