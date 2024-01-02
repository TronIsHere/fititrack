import { useState } from "react";

const useWorkoutFrequency = () => {
  const [workoutFrequency, setWorkoutFrequency] = useState<
    "Weekdays" | "Every day"
  >("Weekdays");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const handleWorkoutFrequencyChange = (
    frequency: "Weekdays" | "Every day"
  ) => {
    setWorkoutFrequency(frequency);
  };

  const handleDaySelect = (day: string) => {
    setSelectedDays((prevDays) =>
      prevDays.includes(day)
        ? prevDays.filter((d) => d !== day)
        : [...prevDays, day]
    );
  };

  return {
    workoutFrequency,
    selectedDays,
    handleWorkoutFrequencyChange,
    handleDaySelect,
  };
};

export default useWorkoutFrequency;
