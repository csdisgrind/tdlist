// Buffer Line
function updateUsernameDisplay() {
  authButton.innerHTML = "Logout";
  loginInput.remove();

  const usernameSpan = document.createElement("span");
  usernameSpan.setAttribute("id", "usernameText");
  usernameSpan.classList.add("font-semibold", "ml-1", "text-lg", "underline");
  usernameSpan.textContent = username;
  usernameDisplay.append(usernameSpan);
}
