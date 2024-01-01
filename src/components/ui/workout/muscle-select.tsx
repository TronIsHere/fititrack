import { FC, useState } from "react";

const MuscleSelect: FC = () => {
  const muscles = ["Legs", "Arms", "Chest", "Core", "Neck", "Back", "Gluteus"];
  const [selectedMuscle, setSelectedMuscle] = useState<string[]>([]);
  const handleMuscleSelect = (muscle: string) => {
    setSelectedMuscle((prevDays) =>
      prevDays.includes(muscle)
        ? prevDays.filter((d) => d !== muscle)
        : [...prevDays, muscle]
    );
  };
  return (
    <div className="flex flex-col  ">
      <span>What muscles you focus</span>
      <div className="flex flex-col md:flex-row border-2 rounded-lg border-palletGray-100 p-1 mt-2 text-sm">
        {muscles.map((muscle) => (
          <span
            key={muscle}
            className={`px-2 py-1 rounded-md mr-1 cursor-pointer transition duration-300 ease-in-out ${
              selectedMuscle.includes(muscle)
                ? "bg-palletPurple-300 text-white"
                : "text-palletGray-100 hover:bg-palletPurple-300 hover:text-white"
            }`}
            onClick={() => handleMuscleSelect(muscle)}
          >
            {muscle}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MuscleSelect;
