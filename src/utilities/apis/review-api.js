import { getAPIHeaders, API_BASE_URL  } from "../api-util";
export async function getReviews(productId) {
  try {
    const response = await fetch(
      `${API_BASE_URL }review/${productId}`,
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
