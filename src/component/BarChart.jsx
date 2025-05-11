import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ chartData }) => {
  const data = {
    labels: chartData.map((item) => item.month),
    datasets: [
      {
        label: "Monthly Ratings",
        data: chartData.map((item) => item.rating),
        backgroundColor: "#aae6df",
        borderColor: "#14B8A6",
        borderWidth: 2,
        pointRadius: 4,
        fill: false,
        lineTension: 0.3,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            min: 1,
            max: 5,
            stepSize: 1,
          },
        },
      ],
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
