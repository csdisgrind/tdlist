// Buffer Line
window.addEventListener("load", async function () {
  let result = await fetchBackend("/user");
  if (result.error || !result.data) {
    showNoTodo();
    return;
  } else {
    username = result.data;
  }
  updateUsernameDisplay();
  await getTodo();
});

addButton.addEventListener("click", async function (event) {
  event.preventDefault();
  const { value } = await inputDialog(
    "New Task Name :",
    "Enter new Task Name ~"
  );
  if (value.trim() === "") {
    errorDialog("Please Enter a Task Name");
    return;
  }

  const result = await fetchBackend("/todo", "POST", { taskName: value });
  if (result.error) return;
  window.location.reload();
});
