import { cn } from "@/lib/utils";
import { FaCheck } from "react-icons/fa6";

export const renderDoneIndicator = (
  done: any,
  onclick: any,
  color: string = "palletGreen-600"
) => {
  return (
    <div
      className={`w-6 h-6 border-2 flex justify-center items-center rounded-lg cursor-pointer mt-1 ${
        done
          ? `border-${color || "palletGreen-600"} bg-${
              color || "palletGreen-600"
            }`
          : "border-palletGray-100 bg-transparent"
      }`}
      onClick={onclick}
    >
      {done && <FaCheck color="#fff" size={14} />}
    </div>
  );
};
