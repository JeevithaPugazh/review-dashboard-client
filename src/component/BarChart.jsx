import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ ratingBreakDown }) => {
    const data = {
      labels: Object.keys(ratingBreakDown), // ['1', '2', '3', '4', '5']
      datasets: [
        {
          label: "Rating Distribution",
          data: Object.values(ratingBreakDown), // [3, 2, 5, 0, 1]
          backgroundColor: "#aae6df",
          borderColor: "#14B8A6",
          borderWidth: 1,
        },
      ],
    };
  console.log("ratingBreakDown values:", Object.values(ratingBreakDown));
    const options = {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              // Force integers
              stepSize: 1,
              
            },
          },
        },
      };
  
    return <Bar data={data} options={options} />;
  };

  

  

export default BarChart;
