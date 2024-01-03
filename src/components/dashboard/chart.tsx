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
      label: "Dataset 1",
      data: [65, 59, 80, 81, 56, 55, 40, 60, 50, 63, 52, 55],
      fill: true,
      tension: 0.4, // Adjust this value for smoothness (0 for straight lines, 1 for maximum smoothness)
      borderColor: "rgba(75,192,192,1)",
      backgroundColor: (context: any) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, "rgba(75,192,192,1)");
        gradient.addColorStop(1, "rgba(75,192,192,0.2)");
        return gradient;
      },
      pointRadius: 0,
    },
  ],
};

const options = {
  responsive: true,
  //   scales: {
  //     y: {
  //       display: false, // Hide the Y-axis labels
  //       grid: {
  //         drawBorder: false, // Optionally, hide the axis line as well
  //       },
  //     },
  //     x: {
  //         display: false,
  //     },
  //   },
  plugins: {
    legend: {
      position: "top" as const,
    },
    tooltip: {
      enabled: false,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const MyChart = () => {
  const chartRef = useRef<ChartJS<"line">>(null);

  React.useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      const ctx = chart.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, "rgba(75,192,192,1)");
      gradient.addColorStop(1, "rgba(75,192,192,0.2)");

      chart.data.datasets[0].backgroundColor = gradient;
      chart.update();
    }
  }, []);

  return <Line ref={chartRef} options={options} data={data} />;
};

export default MyChart;
