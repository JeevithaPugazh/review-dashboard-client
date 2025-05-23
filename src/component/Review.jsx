import React, { useState } from "react";
import { getReviewSource } from "../utilities/data-util";

function Review(review) {
  const maxLength = 100;
  const [expanded, setExpanded] = useState(false);

  const isLong =
    review.description &&
    review.description.length > maxLength;
  const shortText =
    review.description?.slice(0, maxLength) + "...";
  return (
    <div key={review._id} className="card  mb-5 mt-5">
      <h3 className="text-lg font-semibold text-primary mb-1 flex justify-between">
        <div className="flex"><span className="mr-2  material-symbols-outlined ">
          account_circle
        </span>
        {review.name}{" "}</div>
        <div><img className="w-20 h-10" src={getReviewSource()} alt="reviewSource" /></div>
      </h3>
      <h4 className="text-sm font-semibold text-primary mb-2">
        {review.title}
      </h4>
      <p className="text-sm text-secondary mb-2">
        {expanded || !isLong
          ? review.description || "No comment provided."
          : shortText}
      </p>
      {isLong && (
        <a
          className="text-primary underline cursor-pointer text-sm"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? "View Less" : "View More"}
        </a>
      )}
    </div>
  );
}

export default Review;
