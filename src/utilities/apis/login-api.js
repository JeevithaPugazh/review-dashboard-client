import { getAPIHeaders, REACT_APP_API_URL, storeSession } from "../api-util";

export async function handleLogin(email, password) {
  try {
    const response = await fetch(
      `${REACT_APP_API_URL}login`,
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
      storeSession(data);
      return { success: true };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function createUser(
  username,
  email,
  password
) {
  try {
    const response = await fetch(
      `${REACT_APP_API_URL}user`,
      {
        method: "POST",
        headers: getAPIHeaders(true),
        mode: "cors",
        body: JSON.stringify({ username, email, password }),
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to signup");
    } else {
      return data;
    }
  } catch (error) {
    return { error: true, message: error.message };
  }
}
