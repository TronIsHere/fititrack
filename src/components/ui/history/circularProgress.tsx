import { FC, useMemo } from "react";

interface CustomCircularProgressProps {
  value: number; // Progress value (0-100)
  size?: number; // Diameter of the circular progress bar
  strokeWidth?: number; // Width of the stroke
  indicatorColor: string; // Color of the progress indicator
}

const CircularProgressBar: FC<CustomCircularProgressProps> = ({
  value,
  size = 125,
  strokeWidth = 16,
  indicatorColor,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = ((100 - value) / 100) * circumference;
  const gradientId = useMemo(() => `textGradient-${Math.random()}`, []);

  let statusText = "";
  let statusColor = "";
  let backgroundStatusColor = "";
  let gradientFade = "";

  if (value < 30) {
    statusText = "Bad";
    statusColor = "#db3b3b";
    gradientFade = "rgba(219,59,59,0)";
    backgroundStatusColor = "#362b34";
  } else if (value >= 30 && value < 60) {
    statusText = "Medium";
    statusColor = "#6d81a0";
    gradientFade = "rgba(110,128,159,0)";
    backgroundStatusColor = "#2b323e";
  } else {
    statusText = "Good";
    statusColor = "#23b14b";
    gradientFade = "rgba(35,177,75, 0)";
    backgroundStatusColor = "#243735";
  }
  return (
    <div className="flex justify-center items-center">
      <svg width={size} height={size}>
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" style={{ stopColor: gradientFade }} />
            <stop offset="100%" style={{ stopColor: statusColor }} />
          </linearGradient>
        </defs>
        <circle
          stroke={backgroundStatusColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke={statusColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />

        <text
          x="50%"
          y="40%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill={`url(#${gradientId})`}
          style={{ fontSize: size * 0.15, fontWeight: 600 }}
        >
          {`${value}%`}
        </text>
        <text
          x="50%"
          y="60%"
          dominantBaseline="middle"
          textAnchor="middle"
          style={{
            fontSize: size * 0.16,
            fill: statusColor,
            fontWeight: 700,
          }}
        >
          {statusText}
        </text>
      </svg>
    </div>
  );
};

export default CircularProgressBar;
