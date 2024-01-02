import { FC, useState } from "react";

interface WorkoutTypeProps {
  onWorkoutTypeChange: (type: "Strength" | "Cardio") => void;
  workoutType: "Strength" | "Cardio";
}
const WorkoutType: FC<WorkoutTypeProps> = ({
  onWorkoutTypeChange,
  workoutType,
}) => {
  const handleWorkoutTypeSelect = (type: "Strength" | "Cardio") => {
    onWorkoutTypeChange(type);
  };
  return (
    <div className="flex flex-col  ">
      <span>Workout type</span>

      <div className="flex border-2 rounded-lg border-palletGray-100 p-1 mt-2 text-sm">
        <span
          className={`px-5 py-1 rounded-md mr-1 cursor-pointer transition duration-300 ease-in-out ${
            workoutType === "Strength"
              ? "bg-palletPurple-300 text-white"
              : "text-palletGray-100 hover:bg-palletPurple-300 hover:text-white"
          }`}
          onClick={() => handleWorkoutTypeSelect("Strength")}
        >
          Strength
        </span>
        <span
          className={`px-5 py-1 rounded-md mr-1 cursor-pointer transition duration-300 ease-in-out ${
            workoutType === "Cardio"
              ? "bg-palletPurple-300 text-white"
              : "text-palletGray-100 hover:bg-palletPurple-300 hover:text-white"
          }`}
          onClick={() => handleWorkoutTypeSelect("Cardio")}
        >
          Cardio
        </span>
      </div>
    </div>
  );
};

export default WorkoutType;
