// Buffer Line
import { Request, Response, NextFunction } from "express";

async function updateTodoForm(req: Request, res: Response, next: NextFunction) {
  const { todoID } = req.query;
  if (!todoID || !Number.isInteger(parseInt(todoID as string))) {
    res.status(400).json({ error: "Unrecognized Todo" });
    return;
  }

  req.body.id = parseInt(todoID as string);
  const { taskName, isCompleted } = req.body;
  if (taskName && typeof taskName === "string") {
    next();
    return;
  } else if (isCompleted !== undefined && typeof isCompleted === "boolean") {
    next();
    return;
  }
  res.status(400).json({ error: "Invalid Update" });
  return;
}

export default updateTodoForm;
