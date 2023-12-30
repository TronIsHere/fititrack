import { missions } from "@/data/dummy_data";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { FaMedal, FaCheck } from "react-icons/fa6";
export const MissionsComponent = () => {
  const [missionState, setMissionState] = useState(missions);
  const missionDoneHandler = (id: number, index: number) => {
    console.log(missionState);
    setMissionState(
      missionState.map((mission) => {
        if (mission.id === id) {
          return {
            ...mission,
            done: !mission.done,
          };
        }
        return mission;
      })
    );
  };
  return (
    <div className="bg-white w-full rounded-xl p-5 dark:bg-darkPrimary">
      <div className="flex">
        <FaMedal color="#5955ED" size={28} />
        <span className="pl-4 pt-1 font-medium">Missions</span>
      </div>

      {missionState.map((mission, index) => {
        return (
          <div key={mission.id} className="flex mt-5 pl-2 justify-between">
            <span
              className={cn(
                "text-sm",
                mission.done ? "line-through text-palletGreen-600" : ""
              )}
            >
              {mission.title}
            </span>
            {mission.done ? (
              <div className="w-6 h-6 border-2 rounded-lg cursor-pointer border-palletGreen-600 bg-palletGreen-600 flex justify-center items-center">
                <FaCheck
                  color="#fff"
                  size={14}
                  onClick={(e) => missionDoneHandler(mission.id, index)}
                />
              </div>
            ) : (
              <div
                className="w-6 h-6 border-2 rounded-lg cursor-pointer border-palletGray-100"
                onClick={(e) => missionDoneHandler(mission.id, index)}
              ></div>
            )}
          </div>
        );
      })}
      {/* <div className="flex mt-5 pl-2 justify-between">
        <span className="text-sm line-through text-palletGreen-600">
          10 minutes cardio
        </span>
        <div className="w-6 h-6 border-2 rounded-lg cursor-pointer border-palletGreen-600 bg-palletGreen-600 flex justify-center items-center">
          <FaCheck color="#fff" size={14} />
        </div>
      </div> */}
    </div>
  );
};
