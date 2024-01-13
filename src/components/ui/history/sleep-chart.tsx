import React, { useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

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
      data: [8, 4, 7, 4, 3, 3, 1, 4, 5, 6, 10, 2],
      fill: true,
      tension: 0.4, // Adjust this value for smoothness (0 for straight lines, 1 for maximum smoothness)
      borderColor: "rgba(62, 58, 219,1)",
      backgroundColor: (context: any) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, "rgba(62, 58, 219,1)");
        gradient.addColorStop(1, "rgba(62, 58, 219,0.2)");
        return gradient;
      },

      pointRadius: 0,
    },
    // {
    //   label: "Last month",
    //   data: [5, 7, 2, 8, 3, 5, 1, 2, 7, 3, 2, 10, 3],
    //   fill: true,
    //   tension: 0.4, // Adjust this value for smoothness (0 for straight lines, 1 for maximum smoothness)
    //   borderColor: "rgba(62, 58, 219,1)",
    //   backgroundColor: (context: any) => {
    //     const ctx = context.chart.ctx;
    //     const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    //     gradient.addColorStop(0, "rgba(62, 58, 219,1)");
    //     gradient.addColorStop(1, "rgba(62, 58, 219,0.2)");
    //     return gradient;
    //   },

    //   pointRadius: 0,
    // },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: {
      position: "top" as const,
    },
    tooltip: {
      enabled: false,
    },
    title: {
      display: false,
      text: "Sleep",
    },
  },
};

const SleepHistoryChart = () => {
  const chartRef = useRef<ChartJS<"line">>(null);

  React.useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      const ctx = chart.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, "rgba(62, 58, 219,1)");
      gradient.addColorStop(1, "rgba(7, 4, 117,0.1)");

      chart.data.datasets[0].backgroundColor = gradient;
      chart.update();
    }
  }, []);

  return (
    <div className="h-[300px]">
      <Line ref={chartRef} options={options} data={data} />
    </div>
  );
};

export default SleepHistoryChart;
