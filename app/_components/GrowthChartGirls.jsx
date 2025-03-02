import React from "react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js"

// Register chart components once at the top level
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const GrowthChartGirls = ({ userAge, userHeight }) => {
  // X-axis labels could be ages (in years) from 0 to 18, for example
  // Below is truncated just for demonstration
  const labels = [0, 1, 2, 3, 4, 5]

  // SAMPLE percentile data for demonstration only:
  // Replace with the actual WHO/IAP growth chart data for girls
  const girls3rdPercentile = [48.9, 52.0, 54.4, 56.6, 58.0, 59.5]
  const girls50thPercentile = [50.5, 54.0, 56.7, 59.0, 60.8, 62.4]
  const girls97thPercentile = [52.0, 56.0, 59.0, 61.5, 63.3, 65.0]

  const data = {
    labels,
    datasets: [
      {
        label: "3rd Percentile",
        data: girls3rdPercentile,
        borderColor: "rgba(255, 99, 132, 0.8)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: false,
        tension: 0.1
      },
      {
        label: "50th Percentile",
        data: girls50thPercentile,
        borderColor: "rgba(75, 192, 192, 0.8)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: false,
        tension: 0.1
      },
      {
        label: "97th Percentile",
        data: girls97thPercentile,
        borderColor: "rgba(54, 162, 235, 0.8)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: false,
        tension: 0.1
      }
    ]
  }

  // If you want to show the user’s actual measurement on top of the chart:
  if (userAge != null && userHeight != null) {
    data.datasets.push({
      label: "User",
      data: [{ x: userAge, y: userHeight }],
      pointRadius: 6,
      pointBackgroundColor: "black",
      showLine: false, // no line connecting the point
      type: "scatter"
    })
  }

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Age (years)"
        }
      },
      y: {
        title: {
          display: true,
          text: "Height (cm)"
        }
      }
    },
    plugins: {
      legend: {
        position: "top"
      },
      title: {
        display: true,
        text: "WHO/IAP Growth Chart (Girls) - Sample"
      }
    }
  }

  return <Line data={data} options={options} />
}

export default GrowthChartGirls
