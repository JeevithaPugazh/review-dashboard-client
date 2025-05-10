import React, { useEffect, useState } from "react";
import { getReviews } from "../../utilities/apis/review-api";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function ReviewPage() {
  const nav = useNavigate();
  const { id: productId } = useParams();
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    getReviews(productId).then((response) => {
      console.log(response);
      setReviews(response);
    });
  }, []);
  return (
    <div>
      <h1>Your Reviews</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Service</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => {
            return (
              <tr>
                <td>{review.name}</td>
                <td>{review.services}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button
        onClick={() => {
          nav("/productPage");
        }}
      >
        Back to Products
      </button>
    </div>
  );
}

export default ReviewPage;
