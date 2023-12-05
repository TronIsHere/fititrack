import { FaBedPulse } from "react-icons/fa6";
const SleepComponent = () => {
  return (
    <div className="bg-white rounded-xl p-5">
      <div className="flex">
        <FaBedPulse color="#5955ED" size={28} />
        <span className="pl-5 pt-1">Sleep</span>
      </div>
      <div className="flex justify-center  mx-0 md:mx-10  pt-4">
        <div className="flex flex-col items-center w-10 font-light text-sm">
          <div className="h-20 w-3 rounded-xl  bg-palletGray-100"></div>
          <span className="pt-2">Mon</span>
        </div>
        <div className="flex flex-col items-center w-10 font-light text-sm">
          <div className="h-20 w-3 rounded-xl bg-palletGray-100"></div>
          <span className="pt-2">Tue</span>
        </div>
        <div className="flex flex-col items-center w-10 font-light text-sm">
          <div className="h-20 w-3 rounded-xl bg-palletGray-100"></div>
          <span className="pt-2">Wen</span>
        </div>
        <div className="flex flex-col items-center w-10 font-light text-sm">
          <div className="h-20 w-3 rounded-xl bg-palletPurple-300"></div>
          <span className="pt-2">Thu</span>
        </div>
        <div className="flex flex-col items-center w-10 font-light text-sm">
          <div className="h-20 w-3 rounded-xl bg-palletGray-100"></div>
          <span className="pt-2">Fri</span>
        </div>
        <div className="flex flex-col items-center w-10 font-light text-sm">
          <div className="h-20 w-3 rounded-xl bg-palletGray-100"></div>
          <span className="pt-2">Sat</span>
        </div>
        <div className="flex flex-col items-center w-10 font-light text-sm">
          <div className="h-20 w-3 rounded-xl bg-palletGray-100"></div>
          <span className="pt-2">Sun</span>
        </div>
      </div>
    </div>
  );
};

export default SleepComponent;
