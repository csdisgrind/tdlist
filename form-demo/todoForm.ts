// Buffer Line
import { Request, Response, NextFunction } from "express";

async function todoForm(req: Request, res: Response, next: NextFunction) {
  const { taskName } = req.body;
  if (taskName && typeof taskName === "string") {
    next();
  } else {
    res.status(400).json({ error: "Invalid Task Name" });
  }
}

export default todoForm;
