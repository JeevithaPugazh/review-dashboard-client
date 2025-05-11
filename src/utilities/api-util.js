const TOKEN_KEY = "token";
const USER_KEY = "username";
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

export const storeSession = (data) => {
  sessionStorage.setItem(TOKEN_KEY, data.token);
  sessionStorage.setItem(USER_KEY, data.user.username);
};
export const getUserName = () => 
    sessionStorage.getItem(USER_KEY);

export const logout = () => {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(USER_KEY);
  window.location  
}
