import React from "react";
import { AiFillBuild } from "react-icons/ai";
const CharacterComponent = () => {
  return (
    <div className="bg-white w-full rounded-xl p-5">
      <div className="flex ">
        <AiFillBuild color="#5955ED" size={28} />
        <span className="pl-5 pt-1">Character</span>
      </div>
      <div className="flex flex-col pt-4">
        <div className="flex">
          <div className="flex w-full flex-col ">
            <div className="flex justify-end ">
              <span className="text-palletYellow-400 font-bold">10/480 xp</span>
            </div>
            <div className="h-4  bg-palletYellow-400 rounded-lg mt-2"></div>
          </div>

          <img
            src="/images/jeff.png"
            alt=""
            width={50}
            height={100}
            className={"ml-10 mr-5 -mt-4"}
          />
        </div>
        <div className="flex flex-col md:flex-row -mt-9">
          <p className="text-sm w-2/4 mt-4 text-palletGray-300 order-4 md:order-1">
            do missions or workouts to earn xp and level up your character
          </p>
          <span className="font-bold  ml-0 md:ml-12 mt-4 order-3 md:order-2">
            Level 1
          </span>
        </div>
      </div>
    </div>
  );
};

export default CharacterComponent;
