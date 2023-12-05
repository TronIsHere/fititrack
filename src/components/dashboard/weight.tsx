import React from "react";
import { GiWeightScale } from "react-icons/gi";
const WeightComponent = () => {
  return (
    <div className="bg-white rounded-xl p-5 w-full md:w-56">
      <div className="flex">
        <GiWeightScale color="#5955ED" size={28} />
        <span className="pl-5 pt-1">Weight</span>
      </div>
      <div className="flex justify-center pt-8">
        <span className="text-3xl">
          80<span className="text-palletGray-200">kg</span>
        </span>
      </div>
      <div className="flex justify-center pt-1">
        <span className="text-palletGray-200 text-sm font-light mt-8 ">
          current weight
        </span>
      </div>
    </div>
  );
};

export default WeightComponent;
