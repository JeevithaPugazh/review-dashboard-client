import React, { useEffect, useState } from "react";
import { getReviews } from "../utilities/apis/review-api";

import { useNavigate, useParams } from "react-router-dom";
import Review from "../component/Review";
import LineGraph from "../component/LineGraph";


const getMonthName = (dateString)=>{
  const date = new Date(dateString);
return date.toLocaleString("default",{month:"short"});
};
function ReviewPage() {
  const nav = useNavigate();
  const { id: productId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [chartData, setChartData]= useState([]);
  // const [expanded, setExpanded] = useState(false);


  
  
  useEffect(() => {
    getReviews(productId).then((response) => {
      console.log(response);
      setReviews(response);

      const formatted = response.map((review)=>({
        month:getMonthName(review.createdAt), rating:review.rating,
      }));
      setChartData(formatted)

      
    });
  }, []);



  return (
    <div className="h-screen">
    <nav className="bg-primary text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold"> ⭐Revuhub</h1>
        <h2 className="text-xl font-bold flex">Welcome,{}<span className="mr-2  material-symbols-outlined">
        account_circle
                    </span></h2>
      </nav>
    <div className="w-full h-full flex flex-row">
      <div className=" h-full mt-5 w-1/5  bg-surface shadow-md mr-5">
      sidebar
      <div className="material-symbols-outlined bg-primary rounded ml-2 mt-2 cursor-pointer"
        onClick={() => {
          nav("/productPage");
        }}
        
      >
        arrow_back
      </div>
      </div>
      <div className=" h-full w-4/5 flex flex-col mt-5 ">
      <div className="h-1/3 flex flex-row  mb-5 mr-5">
        <div className="w-2/3 card mr-5"><LineGraph chartData = {chartData} />
        </div>
        <div className="w-1/3 card">bar</div>
      </div>
      <div className="h-2/3 flex">
      <div className="w-1/3 card mr-5">bar</div>
      <div className="w-2/3 flex flex-col mr-5 ">
      <div className="h-1/5 bg-primary rounded mb-5"></div>
      <div className=" overflow-y-auto wrap-anywhere pr-2 bg-background p-5 rounded shadow-md">
      
      {reviews.map((review) => 
<Review {...review}/>
       )
       }
      </div>
      </div>
      </div>
      </div>
      </div>
      
    </div>
  );
}

export default ReviewPage;
