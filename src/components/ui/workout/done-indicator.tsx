import { FaCheck } from "react-icons/fa6";

export const renderDoneIndicator = (done: any, onclick: any) => (
  <div
    className={`w-6 h-6 border-2 flex justify-center items-center rounded-lg cursor-pointer ${
      done
        ? "border-palletGreen-600 bg-palletGreen-600"
        : "border-palletGray-100"
    } mt-1`}
    onClick={onclick}
  >
    {done && <FaCheck color="#fff" size={14} />}
  </div>
);
