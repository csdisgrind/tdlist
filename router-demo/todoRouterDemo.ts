// Buffer Line
import { Request, Response, Router } from "express";
import { todoRepository } from "../initRepository";
import todoForm from "../form-demo/todoForm";
import updateTodoForm from "../form-demo/updateTodoForm";

const todoRouterDemo = Router();

todoRouterDemo.get("/", async (req: Request, res: Response) => {
  const { name } = req.session;
  res.json({ data: await todoRepository.getTodo(name as string) });
  return;
});

todoRouterDemo.post("/", todoForm, async (req: Request, res: Response) => {
  const { name } = (req as any).session;
  const { taskName } = req.body;
  const newTodo = { task_name: taskName, user_name: name, is_completed: false };
  try {
    await todoRepository.insertTodo(newTodo);
    res.json({});
    return;
  } catch (error) {
    res.status(500).json({ error: String(error) });
    return;
  }
  return;
});

todoRouterDemo.put("/", updateTodoForm, async (req: Request, res: Response) => {
  const { name } = req.session;
  const { id, ...todoInfo } = req.body;
  const isOwner = todoRepository.checkTodoOwner(id, name as string);

  if (!isOwner) {
    res.status(400).json({ error: "Not the owner of this Todo" });
    return;
  }

  const { taskName, isCompleted } = todoInfo;
  try {
    await todoRepository.updateTodo(
      { task_name: taskName, is_completed: isCompleted },
      id
    );
    res.json({});
    return;
  } catch (error) {
    res.status(500).json({ error: String(error) });
    return;
  }
});

todoRouterDemo.delete("/", async (req: Request, res: Response) => {
  const { todoID } = req.query;
  const id = parseInt(todoID as string);
  if (!todoID || !Number.isInteger(id)) {
    res.status(400).json({ error: "Unrecognized Todo" });
    return;
  }
  const { name } = req.session;
  if (todoRepository.checkTodoOwner(id, name as string)) {
    await todoRepository.deleteTodo(id);
    res.json({});
    return;
  } else {
    res.status(400).json({ error: "Not the owner of this Todo" });
    return;
  }
});

export default todoRouterDemo;
