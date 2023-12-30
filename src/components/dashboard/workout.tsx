import { getMonthDays } from "@/lib/dateUtils";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { FaCheck } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
interface workoutProps {
  editEnabled?: boolean;
  title: string;
  streak: number;
  checkIns: number;
  consistency: number;
  updateWorkout: () => void;
  done: boolean;
  days?: { date: Date; done: boolean }[];
}

const WorkoutComponent: NextPage<workoutProps> = ({
  editEnabled,
  title,
  streak,
  checkIns,
  consistency,
  updateWorkout,
  days,
  done,
}) => {
  const [doneState, setDoneState] = useState<boolean>(false);
  useEffect(() => {
    setDoneState(done);
  }, [done]);
  const handleWorkout = () => {
    setDoneState(!doneState);
  };
  return (
    <div className="bg-white w-full rounded-xl p-5 mb-6 dark:bg-darkPrimary">
      <div className="flex justify-between">
        <span className=" pt-1 font-medium">{title}</span>
        {editEnabled ? (
          <div className="">
            <button className="text-palletRed-500">
              <MdDeleteOutline size={24} />
            </button>
            <button className="text-palletGray-300 ml-5">
              <BiSolidEdit size={24} />
            </button>
          </div>
        ) : doneState ? (
          <div className="w-6 h-6 border-2 rounded-lg cursor-pointer border-palletGreen-600 bg-palletGreen-600 flex mt-1 justify-center items-center">
            <FaCheck color="#fff" size={14} onClick={(e) => handleWorkout()} />
          </div>
        ) : (
          <div
            className="w-6 h-6 border-2 rounded-lg cursor-pointer border-palletGray-100 mt-1"
            onClick={() => handleWorkout()}
          ></div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 w-full my-8 mb-3">
        <div className="col-span-1 flex flex-col items-start md:items-center">
          <div className="flex items-end">
            <span className="font-semibold text-3xl">{consistency}</span>
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
            {/* TODO: Optimize it */}
            {[...Array(getMonthDays)].map((_, index) => {
              const day = days?.find((d) => d.date.getDate() === index + 1);
              const isDone = day?.done ?? false;
              return (
                <div
                  className={`w-4 h-4 rounded-[2px] ${
                    isDone ? "bg-palletPurple-400" : "bg-palletGray-100"
                  } m-1`}
                  key={index}
                ></div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutComponent;
