import { useEffect, useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarElement,
} from "chart.js";
import patternomaly from "patternomaly";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useAppSelector } from "@/hooks/storeHooks";

ChartJS.register(
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarElement // Register the BarController
);
// const patterns = [
//   patternomaly.draw("diagonal", "#1f77b4"), // diagonal pattern
//   patternomaly.draw("cross", "#1f77b4"),
//   // ... other patterns
// ];
const data = {
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  datasets: [
    {
      label: "This month",
      data: [50, 60, 68, 70, 78, 74, 62, 80, 78, 65, 75, 240],
      // backgroundColor: [
      //   patternomaly.draw("square", "#1f77b4"),
      //   patternomaly.draw("line", "#ff7f0e"),
      // ],
      borderColor: "transparent",
      borderWidth: 1,
      barPercentage: 0.6,
      borderRadius: 10,
      borderDash: [10, 5],
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
      mode: "index",
      intersect: false,
      callbacks: {
        // Customize the title
        title: (tooltipItems: any) => {
          return `${tooltipItems[0].formattedValue}hrs`;
        },
        // Customize the label
        label: (tooltipItem: any) => {
          return `Total Sleeping`;
        },
        // You can add more customization here...
      },

      backgroundColor: "#fff",
      titleColor: "rgba(32, 32, 32, 1)",

      titleFont: {
        size: 14,
        weight: "bold",
      },
      bodyColor: "rgba(102, 112, 133, 1)",
      bodyFont: {
        size: 10,
      },
      position: "average",
      align: "center",
      textAlign: "center",
      bodyAlign: "center",
      titleAlign: "center",
      borderColor: "#ddd",
      borderWidth: 1,
      cornerRadius: 10,
      displayColors: false,
    },
  },
  scales: {
    x: { grid: { display: false } },
    y: {
      grid: {
        lineWidth: 2,
        color: "#323743",
      },
    },
  },
};

const WeightHistoryChart = () => {
  const darkModeState = useAppSelector((state) => state.user.darkMode);
  const chartRef = useRef<ChartJS<"bar"> | null>(null);
  useEffect(() => {
    // Ensure that window or document is available
    if (typeof window !== "undefined") {
      // Now it's safe to use window or document
      const chart = chartRef.current;

      if (chart) {
        // Apply these patterns to your chart data
        chart.data.datasets[0].backgroundColor = "#5955ED";
        chart.update();
      }
    }
  }, []);

  return (
    <>
      <div className="flex mb-4 justify-between">
        <h2 className=" font-bold text-xl my-2">Weight</h2>
        <Select>
          <SelectTrigger
            darkMode={darkModeState}
            className="w-[100px] flex justify-around border-2 border-palletGray-300 text-palletGray-300"
          >
            <SelectValue placeholder="Month" className="" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Month">Month</SelectItem>
            <SelectItem value="Year">Year</SelectItem>
            <SelectItem value="Week">Week</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="h-[300px] custom-pattern-container">
        {/* 
// @ts-ignore */}
        <Bar ref={chartRef} options={options} data={data}></Bar>
      </div>
    </>
  );
};

export default WeightHistoryChart;
