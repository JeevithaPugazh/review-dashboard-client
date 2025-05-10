import React, { useEffect, useState } from "react";
import { getReviews } from "../utilities/apis/review-api";
import { useNavigate, useParams } from "react-router-dom";


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
    <nav className="bg-primary text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold"> ⭐Revuhub</h1>
        <h2 className="text-xl font-bold flex">Welcome,{}<span className="mr-2  material-symbols-outlined">
        account_circle
                    </span></h2>
      </nav>
      
      <div></div>
      <h1>Your Reviews</h1>
      <div className="flex flex-col ">
      {reviews.map((review) => (
        <div key={review._id} className="card mb-4">
        
        <h3 className="text-lg font-semibold text-primary mb-1 flex"><span className="mr-2  material-symbols-outlined">
        account_circle
                    </span>{review.name}</h3>
        <h4 className="text-sm font-semibold text-primary mb-2">{review.title}</h4>
        <p className="text-sm text-secondary mb-2">{review.description || "No comment provided."}</p>
        </div>))}
      </div>
     
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
