import { getAPIHeaders, storeSession } from "../api-util";
export async function handleLogin(email, password) {
  try {
    const response = await fetch(
      "http://localhost:3000/api/login",
      {
        method: "POST",
        headers: getAPIHeaders(),
        mode: "cors",
        body: JSON.stringify({ email, password }),
      }
    );
    const data = await response.json();

    if (!response.ok || !data.token) {
      throw new Error(
        data.message || "Invalid email or password"
      );
    } else {
      storeSession(data.token);
      return { success: true };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
}
