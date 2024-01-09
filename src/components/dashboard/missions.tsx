import { useAppSelector } from "@/hooks/storeHooks";
import { getWeekStartDate } from "@/lib/dateUtils";
import {
  toggleMission,
  updateWeeklyMissions,
} from "@/store/slices/missionsSlice";
import { useEffect, useRef, useState } from "react";
import { FaCheck, FaMedal } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { TMission } from "../types/dashboardTypes";
import { cn } from "@/lib/utils";
import { addXp } from "@/store/slices/userSlice";
export const MissionsComponent = () => {
  const dispatch = useDispatch();
  const allMissions = useAppSelector((state) => state.mission.missions);
  const [visibleMissions, setVisibleMissions] = useState<TMission[] | null>([]);
  const missionDoneHandler = (id: number) => {
    dispatch(toggleMission(id));
    const mission: TMission | undefined = allMissions.find((m) => id === m.id);
    if (mission && !mission.done) {
      dispatch(addXp(10));
    }
  };
  useEffect(() => {
    setVisibleMissions(allMissions.slice(0, 5));
  }, [allMissions]);

  return (
    <div className="bg-white w-full rounded-xl p-5 dark:bg-darkPrimary">
      <div className="flex">
        <FaMedal color="#5955ED" size={28} />
        <span className="pl-4 pt-1 font-medium">Missions</span>
      </div>

      {visibleMissions!.map((mission, index) => {
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
                  onClick={(e) => missionDoneHandler(mission.id)}
                />
              </div>
            ) : (
              <div
                className="w-6 h-6 border-2 rounded-lg cursor-pointer border-palletGray-100"
                onClick={(e) => missionDoneHandler(mission.id)}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
};
