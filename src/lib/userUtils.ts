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

export async function addXPToServer(fieldData: number, email: string) {
  const response = await fetch("/api/user/add/character", {
    method: "POST",
    body: JSON.stringify({ field: "xp", data: fieldData, email }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response) {
    return { error: true, message: "Something went wrong." };
  }
  console.log({ data, status: response.status });
  return { data, status: response.status };
}
