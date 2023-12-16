// Buffer Line
function showNoTodo() {
  document.getElementById("todoList").innerHTML = "";
  const noTodoDisplayText = document.createElement("span");
  noTodoDisplayText.innerHTML = "No Todos to Display";
  noTodoDisplayText.classList.add(
    "text-lg",
    "flex",
    "justify-center",
    "font-semibold",
    "animate-bounce"
  );
  document.getElementById("todoList").appendChild(noTodoDisplayText);
}
