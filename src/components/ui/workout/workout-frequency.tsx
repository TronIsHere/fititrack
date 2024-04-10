import { daysOfWeek } from "@/lib/dateUtils";
import { FC, useState } from "react";

interface WorkoutFrequencyProps {
  onWorkoutFrequencyChange: (type: "Weekdays" | "Every day") => void;
  workoutFrequencyState: "Weekdays" | "Every day";
  onWorkoutFrequencyDayChange: (day: string) => void;
  selectedDayState: string[];
}
const WorkoutFrequency: FC<WorkoutFrequencyProps> = ({
  onWorkoutFrequencyChange,
  workoutFrequencyState,
  selectedDayState,
  onWorkoutFrequencyDayChange,
}) => {
  const handleFrequencySelect = (frequency: "Weekdays" | "Every day") => {
    onWorkoutFrequencyChange(frequency);
  };
  const handleFrequencyDaySelect = (day: string) => {
    onWorkoutFrequencyDayChange(day);
  };

  return (
    <>
      <div className="flex flex-col  ">
        <span>Workout frequency</span>
        <div className="flex flex-col md:flex-row border-2 rounded-lg border-palletGray-100 p-1 mt-2 text-sm">
          {daysOfWeek.map((day) => (
            <span
              key={day}
              className={`px-2 py-1 rounded-md mr-1 cursor-pointer transition duration-300 ease-in-out ${
                selectedDayState.includes(day)
                  ? "bg-palletPurple-300 text-white"
                  : "text-palletGray-100 hover:bg-palletPurple-300 hover:text-white"
              }`}
              onClick={() => handleFrequencyDaySelect(day)}
            >
              {day}
            </span>
          ))}
        </div>
      </div>
      <div className="ml-0 md:ml-5">
        <br />

        <div className="flex border-2 rounded-lg border-palletGray-100 p-1 mt-2 text-sm">
          <span
            className={`px-2 py-1 rounded-md mr-1 cursor-pointer transition duration-300 ease-in-out ${
              workoutFrequencyState === "Weekdays"
                ? "bg-palletPurple-300 text-white"
                : "text-palletGray-100 hover:bg-palletPurple-300 hover:text-white"
            }`}
            onClick={() => handleFrequencySelect("Weekdays")}
          >
            Weekdays
          </span>
          <span
            className={`px-2 py-1 rounded-md mr-1 cursor-pointer transition duration-300 ease-in-out ${
              workoutFrequencyState === "Every day"
                ? "bg-palletPurple-300 text-white"
                : "text-palletGray-100 hover:bg-palletPurple-300 hover:text-white"
            }`}
            onClick={() => handleFrequencySelect("Every day")}
          >
            Every day
          </span>
        </div>
      </div>
    </>
  );
};

export default WorkoutFrequency;
