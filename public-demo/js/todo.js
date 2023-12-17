// Buffer Line
function createTodo(todoInfo /* TodoData */, index = 0 /* number */) {
  const { id, task_name, is_completed } = todoInfo;
  const todo = todoTemplate.content.cloneNode(true);
  const editButton = todo.querySelector(".editButton");
  const deleteButton = todo.querySelector(".deleteButton");
  const todoInfoSpan = todo.querySelector(".taskNameText");
  const todoMainDiv = todo.getElementById("todoMainDiv");

  todoInfoSpan.innerHTML = task_name;
  editButton.addEventListener("click", async function (event) {
    event.preventDefault();
    const { value } = await inputDialog(
      "New Task :",
      "Enter new Task name here ~"
    );

    if (value.trim() === "") {
      errorDialog("Please do not input an empty task name");
      return;
    }

    const result = await fetchBackend(`/todo?todoID=${id}`, "PUT", {
      taskName: value,
    });
    if (result.error) return;
    todoInfoSpan.innerHTML = value;
    successDialog("Todo Task name Updated ~");
  });

  deleteButton.addEventListener("click", async function (event) {
    event.preventDefault();
    const { value } = await inputDialog(
      "Type 'confirm' to DELETE this todo",
      ""
    );

    if (value !== "confirm") {
      warningDialog("todo not deleted");
      return;
    }
    const result = await fetchBackend(`/todo?todoID=${id}`, "DELETE");
    if (result.error) return;
    todoMainDiv.remove();
    window.location.reload();
  });

  setTimeout(() => {
    todoMainDiv.classList.add("animated-sliding-todo-div");
  }, 250 * index);
  setTimeout(() => {
    todoMainDiv.classList.remove("opacity-0");
  }, 250 * (index + 2 - 0.5));
  todoListDiv.appendChild(todo);
}
