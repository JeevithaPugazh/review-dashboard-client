import { getAPIHeaders } from "../api-util";
export async function getProducts() {
  try {
    const response = await fetch(
      "http://localhost:3000/api/product",
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
      `http://localhost:3000/api/product/${id}`,
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

export async function getCategories() {
  try {
    const response = await fetch(
      "http://localhost:3000/api/product/categories/",
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
      "http://localhost:3000/api/product",
      {
        method: "POST",
        headers: getAPIHeaders(true),
        mode: "cors",
        body: JSON.stringify(product),
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to add product"
      );
    } else {
      return { success: true };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
}
