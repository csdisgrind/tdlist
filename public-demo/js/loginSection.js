// Buffer Line
authButton.addEventListener("click", async function (event) {
  event.preventDefault();
  if (username) {
    const result = await fetchBackend("/user/logout", "POST");
    if (result.error) return;
    username = null;
    authButton.innerHTML = "Login";
    document.getElementById("usernameText").remove();

    const loginInput = document.createElement("input");
    loginInput.setAttribute("id", "loginInput");
    loginInput.setAttribute("type", "text");
    loginInput.classList.add(
      "border-2",
      "border-slate-300",
      "rounded-md",
      "pl-2"
    );
    usernameDisplay.appendChild(loginInput);

    showNoTodo();
  } else {
    const loginInput = document.getElementById("loginInput");
    if (loginInput.value.trim() === "") {
      errorDialog("Please enter a username");
      return;
    }
    const result = await fetchBackend("/user/login", "POST", {
      name: loginInput.value,
    });
    if (result.error) {
      loginInput.value = "";
      return;
    }

    username = result.data;
    updateUsernameDisplay();
    await getTodo();
  }
});

registerButton.addEventListener("click", async function (event) {
  event.preventDefault();
  const { value } = await inputDialog(
    "New User ? Register Here",
    "Enter username here ~"
  );

  if (value.trim() === "") {
    errorDialog("Please provide a valid username");
    return;
  }

  const result = await fetchBackend("/user/register", "POST", { name: value });
  if (result.error) return;
  successDialog("Successfully Registered User ~");
});
