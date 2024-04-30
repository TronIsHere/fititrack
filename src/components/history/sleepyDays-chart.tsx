import { useAppSelector } from "@/hooks/storeHooks";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { FC, useRef } from "react";
import { Bar } from "react-chartjs-2";
import { TSleep } from "../types/DataTypes";
import { calculateTotalSleepPerDay } from "@/lib/timeUtils";

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

interface SleepyDaysProps {
  sleepData: TSleep[];
}

const SleepyDays: FC<SleepyDaysProps> = ({ sleepData }) => {
  const darkModeState = useAppSelector((state) => state.user.darkMode);
  const chartRef = useRef<ChartJS<"bar"> | null>(null);
  // want to calculate the most sleepy days
  const sleepHoursByDay = Array(7).fill(0);
  sleepData.forEach((sleepEntry) => {
    const sleepDate = new Date(sleepEntry.date);
    const sleepDuration = calculateTotalSleepPerDay([sleepEntry]); // Pass the sleepEntry as an array
    sleepHoursByDay[sleepDate.getDay()] += Math.round(sleepDuration);
  });
  console.log(sleepHoursByDay, 1);

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
        data: sleepHoursByDay,
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
        beginAtZero: false,
        border: {
          dash: [6, 6],
          display: false,
        },
        grid: {
          lineWidth: 2,
          color: darkModeState ? "#323743" : "#D5DBED",
        },
      },
    },
  };
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

export default SleepyDays;
