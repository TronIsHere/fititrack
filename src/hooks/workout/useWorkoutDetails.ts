import { useState } from "react";

const useWorkoutDetails = () => {
  const [nameWorkout, setNameWorkout] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState("palletPurple-500");

  const handleNameChange = (title: string) => {
    setNameWorkout(title);
  };

  const handleColorSelect = (colorClass: string) => {
    setSelectedColor(colorClass);
  };

  return {
    nameWorkout,
    selectedColor,
    handleNameChange,
    handleColorSelect,
    setNameWorkout,
  };
};

export default useWorkoutDetails;
