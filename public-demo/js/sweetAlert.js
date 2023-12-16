// Buffer Line
function successDialog(message /* string */) {
  Swal.fire({
    icon: "success",
    title: message,
  });
}

function warningDialog(message /* string */) {
  Swal.fire({
    icon: "warning",
    title: message,
  });
}

function errorDialog(message /* string */) {
  Swal.fire({
    icon: "error",
    title: "An Error Occurred",
    text: message,
  });
}

async function inputDialog(title, placeholder) {
  return await Swal.fire({
    title,
    input: "text",
    inputLabel: "",
    inputPlaceholder: placeholder,
    showCancelButton: true,
  });
}
