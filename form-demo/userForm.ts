// Buffer Line
import { Request, Response, NextFunction } from "express";

function userForm(req: Request, res: Response, next: NextFunction) {
  const loginForm = req.body;
  if (loginForm.name && typeof loginForm.name === "string") {
    next();
    return;
  }
  res.status(400).json({ error: "Missing name" });
  return;
}

export default userForm;
