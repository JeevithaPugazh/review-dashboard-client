import { getAPIHeaders, REACT_APP_API_URL, toFormData } from "../api-util";
export async function getProducts() {
  try {
    const response = await fetch(
      `${REACT_APP_API_URL}product`,
      {
        headers: getAPIHeaders(true),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getProduct(id) {
  try {
    const response = await fetch(
      `${REACT_APP_API_URL}product/${id}`,
      {
        headers: getAPIHeaders(true),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteProduct(id) {
  try {
    const response = await fetch(
      `${REACT_APP_API_URL}product/${id}`,
      {
        method: "DELETE",
        headers: getAPIHeaders(true),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getCategories() {
  try {
    const response = await fetch(
      `${REACT_APP_API_URL}product/categories/`,
      {
        headers: getAPIHeaders(),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function addProduct(product) {
  try {
    const response = await fetch(
      `${REACT_APP_API_URL}product`,
      {
        method: "POST",
        headers: getAPIHeaders(true, false),
        mode: "cors",
        body: toFormData(product),
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to add product"
      );
    } else {
      return data;
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function updateProduct(productId, product) {
  try {
    console.log(product);
    const response = await fetch(
      `${REACT_APP_API_URL}product/${productId}`,
      {
        method: "PUT",
        headers: getAPIHeaders(true, false),
        mode: "cors",
        body: toFormData(product)
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to update product"
      );
    } else {
      return data;
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
}
