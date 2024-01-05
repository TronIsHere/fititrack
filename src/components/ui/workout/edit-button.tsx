import { FC } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";

export const renderEditButtons = (updateWorkout: () => void) => (
  <div>
    <button className="text-palletRed-500">
      <MdDeleteOutline size={24} onClick={() => updateWorkout()} />
    </button>
    <button className="text-palletGray-300 ml-5">
      <BiSolidEdit size={24} />
    </button>
  </div>
);
