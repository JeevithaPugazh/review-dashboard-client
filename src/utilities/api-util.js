const TOKEN_KEY = "token";
export const getAPIHeaders = (tokenRequired = false) => {
  let headers = {
    "Content-Type": "application/json",
  };
  if (tokenRequired) {
    const token = sessionStorage.getItem(TOKEN_KEY);
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

export const storeSession = (token) => {
  sessionStorage.setItem(TOKEN_KEY, token);
};
