// Buffer Line
import { Todo, TodoData, TodoInfo } from "../utils-demo/types";
import fs from "fs";

class TodoRepository {
  private data: TodoData[];
  constructor(todoList: TodoData[]) {
    this.data = todoList;
  }

  private async updateStorage() {
    fs.writeFileSync("./storage-demo/todo.json", JSON.stringify(this.data));
  }

  checkTodoOwner(todoID: number, username: string) {
    return this.data.reduce((acc, todo) => {
      return todo.id === todoID && todo.user_name === username ? true : acc;
    }, false);
  }

  async getTodo(username: string) {
    return this.data.filter((todo) => todo.user_name === username);
  }

  async insertTodo(newTodo: Todo) {
    const newID =
      this.data.length === 0 ? 1 : this.data[this.data.length - 1].id + 1;
    this.data.push({ ...newTodo, id: newID });
    this.updateStorage();
  }

  async updateTodo(newTodoInfo: Partial<TodoInfo>, id: number) {
    const { task_name, is_completed } = newTodoInfo;
    const todoIndex =
      this.data.reduce((acc, todo) => {
        return todo.id === id ? todo.id : acc;
      }, -1) - 1;
    if (todoIndex === -1) {
      throw new Error("Invalid Todo");
    }
    this.data = [
      ...this.data.slice(0, todoIndex),
      task_name
        ? ({ ...this.data[todoIndex], task_name } as TodoData)
        : ({ ...this.data[todoIndex], is_completed } as TodoData),
      ...this.data.slice(todoIndex + 1),
    ];
    await this.updateStorage();
  }

  async deleteTodo(todoID: number) {
    this.data = this.data.filter((todo) => todo.id !== todoID);
    await this.updateStorage();
  }
}

export default TodoRepository;
