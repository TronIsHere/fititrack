import { BiSolidEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";

export const renderEditButtons = () => (
  <div>
    <button className="text-palletRed-500">
      <MdDeleteOutline size={24} />
    </button>
    <button className="text-palletGray-300 ml-5">
      <BiSolidEdit size={24} />
    </button>
  </div>
);
