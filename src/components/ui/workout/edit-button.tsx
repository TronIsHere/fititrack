import { FC } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";

export const renderEditButtons = (
  updateWorkout: (type: "edit" | "delete") => void
) => (
  <div>
    <button
      className="text-palletRed-500"
      onClick={() => updateWorkout("delete")}
    >
      <MdDeleteOutline size={24} />
    </button>
    <button
      className="text-palletGray-300 ml-5"
      onClick={() => updateWorkout("edit")}
    >
      <BiSolidEdit size={24} />
    </button>
  </div>
);
