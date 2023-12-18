import React from "react";
import { FaMedal, FaCheck } from "react-icons/fa6";
export const MissionsComponent = () => {
  return (
    <div className="bg-white w-full rounded-xl p-5 dark:bg-darkPrimary">
      <div className="flex">
        <FaMedal color="#5955ED" size={28} />
        <span className="pl-4 pt-1 font-medium">Missions</span>
      </div>
      <div className="flex mt-5 pl-2 justify-between">
        <span className="text-sm ">10 minutes cardio</span>
        <div className="w-6 h-6 border-2 rounded-lg cursor-pointer border-palletGray-100"></div>
      </div>
      <div className="flex mt-5 pl-2 justify-between">
        <span className="text-sm ">10 minutes cardio</span>
        <div className="w-6 h-6 border-2 rounded-lg cursor-pointer border-palletGray-100"></div>
      </div>
      <div className="flex mt-5 pl-2 justify-between">
        <span className="text-sm line-through text-palletGreen-600">
          10 minutes cardio
        </span>
        <div className="w-6 h-6 border-2 rounded-lg cursor-pointer border-palletGreen-600 bg-palletGreen-600 flex justify-center items-center">
          <FaCheck color="#fff" size={14} />
        </div>
      </div>
    </div>
  );
};
