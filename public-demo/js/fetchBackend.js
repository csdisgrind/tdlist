// Buffer Line
async function fetchBackend(
  url /* string */,
  method = "GET" /* string */,
  data = null /* object */
) {
  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: data ? JSON.stringify(data) : null,
  });
  const result = await res.json();
  if (result.error) {
    errorDialog(result.error);
  }
  return result;
}
