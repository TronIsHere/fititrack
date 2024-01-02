import { useState } from "react";

const useMusclesSelect = () => {
  const [selectedMuscles, setSelectedMuscles] = useState<string[]>([]);

  const handleMuscleSelect = (muscle: string) => {
    setSelectedMuscles((prevMuscles) =>
      prevMuscles.includes(muscle)
        ? prevMuscles.filter((m) => m !== muscle)
        : [...prevMuscles, muscle]
    );
  };

  return {
    selectedMuscles,
    handleMuscleSelect,
  };
};

export default useMusclesSelect;
