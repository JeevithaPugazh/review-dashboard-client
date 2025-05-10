import { getAPIHeaders } from "../api-util";
export async function getReviews(productId) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/review/${productId}`,
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
