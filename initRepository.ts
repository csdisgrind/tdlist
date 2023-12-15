// Buffer Line
import TodoRepository from "./repository-demo/TodoRepository";
import UserRepository from "./repository-demo/UserRepository";
import fs from "fs";

const userData = fs.readFileSync("./storage-demo/user.json").toString();
const todoData = fs.readFileSync("./storage-demo/todo.json").toString();

export const userRepository = new UserRepository(JSON.parse(userData));
export const todoRepository = new TodoRepository(JSON.parse(todoData));
