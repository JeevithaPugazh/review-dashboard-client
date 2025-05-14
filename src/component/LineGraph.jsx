import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const LineGraph = ({ chartData }) => {
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
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 1,
        max: 5,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineGraph;
