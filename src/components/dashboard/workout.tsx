import { getMonthDays } from "@/lib/dateUtils";
import { getDaysInMonth } from "date-fns";
import { NextPage } from "next";
import { BiSolidEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
interface workoutProps {
  editEnabled?: boolean;
  title: string;
  streak: number;
  checkIns: number;
  consistency: number;
  toggleWorkout: () => void;
}

const WorkoutComponent: NextPage<workoutProps> = ({
  editEnabled,
  title,
  streak,
  checkIns,
  consistency,
  toggleWorkout,
}) => {
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
        ) : (
          <div
            className="w-6 h-6 border-2 rounded-lg cursor-pointer border-palletGray-100 mt-1"
            onClick={() => toggleWorkout()}
          ></div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 w-full mt-8">
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
        <div className="col-span-2 flex flex-col w-64 items-center justify-end">
          <div className="flex justify-end flex-wrap">
            {[...Array(getMonthDays)].map((item) => (
              <div className="w-4 h-4 bg-palletGray-100 m-1"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutComponent;
