import React, { useEffect, useState } from "react";
import { getReviews } from "../utilities/apis/review-api";
import { getProduct } from "../utilities/apis/product-api";
import { useNavigate, useParams } from "react-router-dom";
import Review from "../component/Review";
import LineGraph from "../component/LineGraph";
import ProgressBar from "../component/ProgressBar";
import Nav from "../component/Nav";

const getMonthName = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("default", { month: "short" });
};
function ReviewPage() {
  const nav = useNavigate();
  const { id: productId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [progress, setProgress] = useState([]);
  const [overallRating, setOverallRating] = useState([]);
  const [totalRating, setTotalRating] = useState([]);
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
        const totalReview = response.length;
        setTotalRating(totalReview);
        const totalRating = response.reduce(
          (acc, review) => acc + review.rating,
          0
        );

        const avgRating =
          totalReview > 0
            ? (totalRating / totalReview).toFixed(1)
            : 0;
        setOverallRating(avgRating);

        const ratingCount = {
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
        };
        response.forEach((review) => {
          const r = Math.round(review.rating);
          if (ratingCount[r] !== undefined) {
            ratingCount[r]++;
          }
        });

        const ratingPercentage = {};

        Object.keys(ratingCount).forEach((key) => {
          ratingPercentage[key] = (
            (ratingCount[key] / totalReview) *
            100
          ).toFixed(1);
        });
        setProgress(ratingPercentage);

        const serviceSums = {};
        const serviceCounts = {};

        response.forEach((review) => {
          const serviceMap = review.serviceRatings || {};
          Object.entries(serviceMap).forEach(
            ([key, val]) => {
              serviceSums[key] =
                (serviceSums[key] || 0) + val;
              serviceCounts[key] =
                (serviceCounts[key] || 0) + 1;
            }
          );
        });

        const serviceAverage = {};
        Object.keys(serviceSums).forEach((key) => {
          serviceAverage[key] = (
            serviceSums[key] / serviceCounts[key]
          ).toFixed(1);
        });
        setServiceRatings(serviceAverage);
      });
    }
  }, [productId]);

  return (
    <div className="h-screen overflow-hidden">
      {product && (
        <>
          <Nav />
          <div className="mt-2 ml-2 flex flex-row">
            {/* <div
              className=" cursor-pointer mr-2 text-blue-600 dark:text-blue-500 hover:underline"
              onClick={() => {
                nav("/productPage");
              }}
            >
            <b>Products</b>
            </div>
            <div>/<b className="ml-2">{product.name}</b>
                    </div> */}
            <nav class="flex mb-1" aria-label="Breadcrumb">
              <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li class="inline-flex items-center">
                  <a
                    href="#"
                    class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                  >
                    <svg
                      class="w-3 h-3 me-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
                    <div className="ml-1"  onClick={() => {
                nav("/productPage");
              }}>Products</div>
                  </a>
                </li>
               
                <li aria-current="page">
                  <div class="flex items-center">
                    <svg
                      class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                    <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                      {product.name}
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          <div className="w-full h-full flex flex-row">
            <div className="w-1/5 flex flex-col mr-5 ml-5">
              <div className="h-full w-full card">
                <div className="">
                  <img
                    className="rounded w-full h-90"
                    src={product.imageUrl}
                    alt={product.name}
                  ></img>

                  <div className="mt-5 w-full h-flex justify-center flex-col">
                    <div>
                      <b>{product.name}</b>
                    </div>
                    <div>{product.description}</div>
                    <div className="flex mt-3">
                      <span class="material-symbols-outlined">
                        location_on
                      </span>
                      <b>{product.location}</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-full w-4/5 flex flex-col">
              <div className="h-2/4 flex flex-row mb-5 mr-5">
                <div className="w-2/3  card  mr-5">
                  <div className="flex">
                    <div className="mr-10">
                      <b>Overall rating:</b> {overallRating}
                      ⭐
                    </div>
                    <div>
                      <b>Total Reviews:</b> {totalRating}
                    </div>
                  </div>
                  <div className="h-full w-full pb-5">
                    <LineGraph chartData={chartData} />
                  </div>
                </div>
                <div className="w-1/3  card">
                  <h2 className="text-md font-bold mb-2">
                    Rating Distribution
                  </h2>
                  <ProgressBar
                    progress={progress}
                    type="rating"
                  />
                </div>
              </div>
              <div className="h-1/3 flex">
                <div className="w-1/3 card mr-5">
                  <h2 className="text-md font-bold mb-2">
                    Service Ratings
                  </h2>
                  <ProgressBar
                    progress={serviceRatings}
                    type="service"
                  />
                </div>
                <div className="w-2/3 flex flex-col mr-5 ">
                  <div className="h-10 bg-primary fixed w-2/4 rounded mb-5 pl-5 pt-2">
                    <b>Reviews</b>
                  </div>
                  <div className=" overflow-y-auto wrap-anywhere pr-2 bg-background p-5 rounded shadow-md">
                    {reviews.map((review) => (
                      <Review {...review} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ReviewPage;
