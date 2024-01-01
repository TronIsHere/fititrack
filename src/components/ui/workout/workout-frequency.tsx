import { daysOfWeek } from "@/lib/dateUtils";
import { FC, useState } from "react";

const WorkoutFrequency: FC = () => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedFrequency, setSelectedFrequency] = useState<
    "Weekdays" | "Every day"
  >("Weekdays");
  const handleFrequencySelect = (frequency: "Weekdays" | "Every day") => {
    setSelectedFrequency(frequency);
  };

  const handleDaySelect = (day: string) => {
    setSelectedDays((prevDays) =>
      prevDays.includes(day)
        ? prevDays.filter((d) => d !== day)
        : [...prevDays, day]
    );
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
                selectedDays.includes(day)
                  ? "bg-palletPurple-300 text-white"
                  : "text-palletGray-100 hover:bg-palletPurple-300 hover:text-white"
              }`}
              onClick={() => handleDaySelect(day)}
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
              selectedFrequency === "Weekdays"
                ? "bg-palletPurple-300 text-white"
                : "text-palletGray-100 hover:bg-palletPurple-300 hover:text-white"
            }`}
            onClick={() => handleFrequencySelect("Weekdays")}
          >
            Weekdays
          </span>
          <span
            className={`px-2 py-1 rounded-md mr-1 cursor-pointer transition duration-300 ease-in-out ${
              selectedFrequency === "Every day"
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
