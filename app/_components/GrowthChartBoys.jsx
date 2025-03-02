// file: GrowthChartBoys.jsx
import React from "react"
import { Line } from "react-chartjs-2"

// Register any chart components you need
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const GrowthChartBoys = ({ userAge, userHeight }) => {
  // Labels could be ages 0 through 18, for example:
  const labels = [0, 1, 2, 3, 4, 5] // <-- truncated for example

  // Each dataset represents one percentile curve
  // Data below is just SAMPLE. Replace with real WHO data for 0–18 yrs.
  const data = {
    labels,
    datasets: [
      {
        label: "3rd Percentile",
        data: [49.1, 52.3, 54.5, 56.7, 58.6, 60.2], // example only
        borderColor: "rgba(255, 0, 0, 0.8)",
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        fill: false,
        tension: 0.1
      },
      {
        label: "50th Percentile",
        data: [51.5, 54.9, 57.8, 60.5, 62.7, 64.3], // example only
        borderColor: "rgba(0, 128, 0, 0.8)",
        backgroundColor: "rgba(0, 128, 0, 0.2)",
        fill: false,
        tension: 0.1
      },
      {
        label: "97th Percentile",
        data: [53.0, 57.5, 60.9, 63.8, 66.1, 67.8], // example only
        borderColor: "rgba(0, 0, 255, 0.8)",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
        fill: false,
        tension: 0.1
      }
    ]
  }

  // If you want to plot the user’s actual measurement on top of the chart:
  // We can add a "scatter" dataset for the user’s single point
  if (userAge != null && userHeight != null) {
    // Make sure userAge corresponds to the X-axis scale (here it's [0..18]).
    // userHeight is in cm. 
    data.datasets.push({
      label: "User",
      data: [{ x: userAge, y: userHeight }],
      pointRadius: 6,
      pointBackgroundColor: "black",
      showLine: false, // This ensures it's just a single point
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
        },
        // If using scatter-like data, you might want:
        // type: 'linear', 
        // beginAtZero: true,
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
        text: "WHO/IAP Growth Chart (Boys, 0–5 yrs example)"
      }
    }
  }

  return <Line data={data} options={options} />
}

export default GrowthChartBoys
