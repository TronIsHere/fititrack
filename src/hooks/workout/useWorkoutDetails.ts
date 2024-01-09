import { useState } from "react";

const useWorkoutDetails = () => {
  const [nameWorkout, setNameWorkout] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState("red-400");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameWorkout(e.target.value);
  };

  const handleColorSelect = (colorClass: string) => {
    setSelectedColor(colorClass);
  };

  return {
    nameWorkout,
    selectedColor,
    handleNameChange,
    handleColorSelect,
  };
};

export default useWorkoutDetails;
