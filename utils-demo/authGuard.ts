// Buffer Line
import { Request, Response, NextFunction } from "express";

function authGuard(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.name) {
    next();
    return;
  } else {
    res.status(401).json({ error: "Not Authorized" });
    return; // Theoretically not necessary, but just in case;
  }
}

export default authGuard;
