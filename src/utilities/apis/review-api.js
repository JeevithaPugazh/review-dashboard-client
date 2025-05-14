import { getAPIHeaders, REACT_APP_API_URL } from "../api-util";
export async function getReviews(productId) {
  try {
    const response = await fetch(
      `${REACT_APP_API_URL}review/${productId}`,
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
