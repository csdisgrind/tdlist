// Buffer Line
async function getTodo() {
  const result = await fetchBackend("/todo");
  if (result.error) {
    showNoTodo();
    return;
  }
  todoList = result.data;
  document.getElementById("todoList").innerHTML = "";
  if (todoList.length == 0) {
    showNoTodo();
    return;
  }
  todoList.map((todo, index) => createTodo(todo, index));
}
