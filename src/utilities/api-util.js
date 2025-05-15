const TOKEN_KEY = "token";
const USER_KEY = "username";

export const API_BASE_URL = import.meta.env.VITE_API_URL;

export const getAPIHeaders = (
  tokenRequired = false,
  contentTypeRequired = true
) => {
  let headers = contentTypeRequired
    ? {
        "Content-Type": "application/json",
      }
    : {};
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
  window.location;
};

export const toFormData = (product) => {
  const formData = new FormData();
  formData.append("name", product.name);
  formData.append("location", product.location);
  formData.append("description", product.description);
  formData.append("category", product.category);
  formData.append(
    "services",
    JSON.stringify(product.services)
  );
  if (product.image) {
    formData.append("image", product.image);
  }
  return formData;
};
