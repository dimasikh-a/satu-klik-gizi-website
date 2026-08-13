export async function getUsers() {
  const response = await fetch(
    "http://localhost:5000/api/users"
  );

  if (!response.ok) {
    throw new Error("Failed fetch users");
  }

  return response.json();
}