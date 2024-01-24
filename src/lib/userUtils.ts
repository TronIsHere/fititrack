export async function createUser(
  email: string,
  password: string,
  name: string
) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password, name }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response) {
    return { error: true, message: "Something went wrong." };
  }
  return { data, status: response.status };
}
