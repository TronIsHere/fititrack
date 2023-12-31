import { getMonthDays, isSameDay, startOfDay } from "@/lib/dateUtils";
import { TWorkout } from "@/types/workout";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { FaCheck } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { renderDayGrid } from "../ui/workout/render-day-grid";
interface workoutProps {
  workout: TWorkout;
  editEnabled?: boolean;
  updateWorkout: () => void;
}

const WorkoutComponent: NextPage<workoutProps> = ({
  editEnabled,
  workout,
  updateWorkout,
}) => {
  if (!workout) {
    return null;
  }
  const { checkIns, title, streak, days, done }: TWorkout = workout;
  const [workoutState, setWorkoutState] = useState<TWorkout>(workout);
  const handleWorkout = () => {
    const today = new Date();

    setWorkoutState((prevState) => {
      const currentDays = prevState.days || [];
      const existingDayIndex = currentDays.findIndex((d) =>
        isSameDay(d.date, today)
      );

      let updatedDays;

      if (existingDayIndex >= 0) {
        updatedDays = [...currentDays];
        updatedDays[existingDayIndex] = {
          ...updatedDays[existingDayIndex],
          done: !updatedDays[existingDayIndex].done,
        };
      } else {
        updatedDays = [...currentDays, { date: today, done: true }];
      }

      return {
        ...prevState,
        done: !workoutState.done,
        days: updatedDays,
      };
    });
  };

  const renderEditButtons = () => (
    <div>
      <button className="text-palletRed-500">
        <MdDeleteOutline size={24} />
      </button>
      <button className="text-palletGray-300 ml-5">
        <BiSolidEdit size={24} />
      </button>
    </div>
  );
  const renderDoneIndicator = () => (
    <div
      className={`w-6 h-6 border-2 flex justify-center items-center rounded-lg cursor-pointer ${
        workoutState?.done
          ? "border-palletGreen-600 bg-palletGreen-600"
          : "border-palletGray-100"
      } mt-1`}
      onClick={handleWorkout}
    >
      {workoutState?.done && <FaCheck color="#fff" size={14} />}
    </div>
  );
  return (
    <div className="bg-white w-full rounded-xl p-5 mb-6 dark:bg-darkPrimary">
      <div className="flex justify-between">
        <span className=" pt-1 font-medium">{title}</span>
        {editEnabled ? renderEditButtons() : renderDoneIndicator()}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 w-full my-8 mb-3">
        <div className="col-span-1 flex flex-col items-start md:items-center">
          <div className="flex items-end">
            <span className="font-semibold text-3xl">{20}</span>
            <span className="text-palletGray-200">%</span>
          </div>
          <span className="text-palletGray-200 font-normal text-sm mt-4">
            Consistency
          </span>
        </div>
        <div className="col-span-1 flex flex-col items-start md:items-center">
          <div className="flex items-end">
            <span className="font-semibold text-3xl">{streak}</span>
            <span className="text-palletGray-200">days</span>
          </div>
          <span className="text-palletGray-200 font-normal text-sm mt-4">
            Streak
          </span>
        </div>
        <div className="col-span-1 flex flex-col items-start md:items-center my-5 md:my-0">
          <div className="flex items-end">
            <span className="font-semibold text-3xl">{checkIns}</span>
            <span className="text-palletGray-200"></span>
          </div>
          <span className="text-palletGray-200 font-normal text-sm mt-4">
            Check-ins
          </span>
        </div>
        <div className="col-span-2 flex flex-col w-full items-center justify-end">
          <div className="flex justify-start mx-8 flex-wrap">
            {renderDayGrid(workoutState)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutComponent;
