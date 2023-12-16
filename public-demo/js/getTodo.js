// Buffer Line
async function getTodo() {
  const result = await fetchBackend("/todo");
  if (result.error) {
    showNoTodo();
    return;
  }
  todoList = result.data;
  document.getElementById("todoList").innerHTML = "";
  todoList.map((todo, index) => createTodo(todo, index));
}
