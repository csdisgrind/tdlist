// Buffer Line
export type User = { name: string };

export type TodoInfo = {
  task_name: string;
  is_completed: boolean;
};

export type Todo = TodoInfo & { user_name: string };

export type TodoData = Todo & { id: number };
