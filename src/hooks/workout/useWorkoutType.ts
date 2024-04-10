import { useState } from "react";

const useWorkoutType = () => {
  const [workoutType, setWorkoutType] = useState<"Strength" | "Cardio">(
    "Strength"
  );

  const handleWorkoutTypeChange = (type: "Strength" | "Cardio") => {
    setWorkoutType(type);
  };

  return {
    workoutType,
    handleWorkoutTypeChange,
  };
};

export default useWorkoutType;
