// Buffer Line
import { Request, Response, Router } from "express";
import { userRepository } from "../initRepository";
import userForm from "../form-demo/userForm";

const userRouterDemo = Router();

userRouterDemo.get("/", async (req: Request, res: Response) => {
  res.json({ data: (req as any).session?.name });
  return;
});

userRouterDemo.post("/login", userForm, async (req: Request, res: Response) => {
  const { name } = req.body;
  if (!(await userRepository.getUser({ name }))) {
    res.json({ error: "User does not exist" });
    return;
  }
  //@ts-ignore
  req.session.name = name;
  req.session.save();
  res.json({ data: name });
  return;
});

userRouterDemo.post(
  "/register",
  userForm,
  async (req: Request, res: Response) => {
    const { name } = req.body;
    try {
      await userRepository.insertUser({ name });
      res.json({});
      return;
    } catch (error) {
      res.status(500).json({ error: String(error) });
      return;
    }
  }
);

userRouterDemo.post("/logout", (req: Request, res: Response) => {
  req.session.destroy((err) => {
    // console.log(err);
  });
  res.json({});
  return;
});
export default userRouterDemo;
