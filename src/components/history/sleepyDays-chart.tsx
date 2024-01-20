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
const barColors = [
  "#FF6384", // color for Sunday
  "#36A2EB", // color for Monday
  "#FFCE56", // color for Tuesday
  "#4BC0C0", // color for Wednesday
  "#9966FF", // color for Thursday
  "#FF9F40", // color for Friday
  "#4D5360", // color for Saturday
];
const data = {
  labels: [
    "Sun", // Sunday
    "Mon", // Monday
    "Tue", // Tuesday
    "Wed", // Wednesday
    "Thu", // Thursday
    "Fri", // Friday
    "Sat", // Saturday
  ],
  datasets: [
    {
      label: "This month",
      data: [3, 3, 4, 8, 2, 3, 2, 3],
      backgroundColor: barColors,
      borderColor: "transparent",
      borderWidth: 1,
      barPercentage: 0.8,
      borderRadius: 6,
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

const SleepyDyas = () => {
  const darkModeState = useAppSelector((state) => state.user.darkMode);
  const chartRef = useRef<ChartJS<"bar"> | null>(null);
  useEffect(() => {
    // Ensure that window or document is available
    if (typeof window !== "undefined") {
      // Now it's safe to use window or document
      const chart = chartRef.current;
    }
  }, []);

  return (
    <>
      <div className="h-[150px] custom-pattern-container mt-5">
        {/* 
// @ts-ignore */}
        <Bar ref={chartRef} options={options} data={data}></Bar>
      </div>
    </>
  );
};

export default SleepyDyas;
