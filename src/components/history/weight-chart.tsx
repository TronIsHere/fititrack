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
import { useRef } from "react";
import { Bar } from "react-chartjs-2";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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
      backgroundColor: "#5955ED",
      borderColor: "transparent",
      borderWidth: 1,
      barPercentage: 0.6,
      borderRadius: 10,
      borderDash: [10, 5],
    },
  ],
};

const WeightHistoryChart = () => {
  const darkModeState = useAppSelector((state) => state.user.darkMode);
  const chartRef = useRef<ChartJS<"bar"> | null>(null);
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
            return `${tooltipItems[0].formattedValue} KG`;
          },
          // Customize the label
          label: (tooltipItem: any) => {
            return `Average Weight`;
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
          dash: [6, 8],
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
