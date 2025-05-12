import React, { useEffect, useState } from "react";
import { getReviews } from "../utilities/apis/review-api";
import {
  getProduct,
} from "../utilities/apis/product-api";
import { useNavigate, useParams } from "react-router-dom";
import Review from "../component/Review";
import LineGraph from "../component/LineGraph";
import ProgressBar from "../component/ProgressBar";
import Nav from "../component/Nav";



const getMonthName = (dateString)=>{
  const date = new Date(dateString);
return date.toLocaleString("default",{month:"short"});
};
function ReviewPage() {
  const nav = useNavigate();
  const { id: productId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [chartData, setChartData]= useState([]);
  const [progress,setProgress] = useState([]);
  // const [expanded, setExpanded] = useState(false);
  const [product, setProduct] = useState(null);
  const [serviceRatings, setServiceRatings] = useState({});

  
  
  useEffect(() => {
    if (productId) {
      getProduct(productId).then((res) => {
        setProduct(res);
      });
  
      getReviews(productId).then((response) => {
        setReviews(response);
  
        const formatted = response.map((review) => ({
          month: getMonthName(review.createdAt),
          rating: review.rating,
        }));
        setChartData(formatted);
  
        const ratingCount = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        response.forEach((review) => {
          const r = Math.round(review.rating);
          if (ratingCount[r] !== undefined) {
            ratingCount[r]++;
          }
        });

        const totlaReview = response.length;
        const ratingPercentage = {};
        Object.keys(ratingCount).forEach((key) =>{
          ratingPercentage[key]= ((ratingCount[key]/totlaReview)*100).toFixed(1);
        })
        setProgress(ratingPercentage);

        const serviceSums = {};
        const serviceCounts = {};

        response.forEach((review)=>{
          const serviceMap = review.serviceRatings || {};
          Object.entries(serviceMap).forEach(([key, val]) => {
            serviceSums[key] = (serviceSums[key] || 0) + val;
            serviceCounts[key] = (serviceCounts[key] || 0)+ 1
          });
        });

        const serviceAverage = {}
        Object.keys(serviceSums).forEach((key)=>{
          serviceAverage[key] = (serviceSums[key] / serviceCounts[key].toFixed(1));
        })
        setServiceRatings(serviceAverage);
      });
    }
  }, [productId]);

  return (
    
    <div className="h-screen">
    { product && <>
    <Nav/>
      <div className="w-full h-full flex flex-row">
      <div className="h-full mt-5 w-1/5  bg-surface shadow-md mr-5">
      
      <img src={`http://localhost:3000/${product.imageUrl}`} alt={product.name} />
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
        <div className="w-1/3 card"><ProgressBar progress = {progress} /></div>
      </div>
      <div className="h-2/3 flex">
      <div className="w-1/3 card mr-5"><ProgressBar progress = {serviceRatings} max={5}/></div>
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
      
      </>}
    </div>
);
}

export default ReviewPage;
