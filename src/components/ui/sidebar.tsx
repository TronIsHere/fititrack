import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { BiSolidDashboard } from "react-icons/bi";
import { FaChartLine } from "react-icons/fa6";
import { FiActivity, FiLogOut } from "react-icons/fi";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoSettings } from "react-icons/io5";
interface sidebarProps {
  darkMode: Boolean;
}
const SidebarComponent: NextPage<sidebarProps> = ({ darkMode }) => {
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);
  return (
    <>
      <div className="hidden md:flex flex-col   ">
        <Link href={"/dashboard"} className="self-center">
          <img
            src="/images/logo.svg"
            alt=""
            width={180}
            className=" mt-8  bg-white p-3 rounded-xl"
          />
        </Link>
        <ul className="mt-14 m-8">
          <Link
            href={"/dashboard"}
            className="flex items-center text-palletGray-200 py-2 px-6 rounded-full cursor-pointer hover:text-palletPurple-500 hover:bg-palletPurple-200 duration-500"
          >
            <BiSolidDashboard size={20} />
            <span className=" pl-3">Dashboard</span>
          </Link>
          <Link
            href={"/dashboard/workouts"}
            className="flex items-center text-palletGray-200 py-2 px-6 rounded-full cursor-pointer mt-3 hover:text-palletPurple-500 hover:bg-palletPurple-200 duration-500"
          >
            <FiActivity className="" size={20} />
            <span className=" pl-3">Workouts</span>
          </Link>
          <Link
            href={"/dashboard/history"}
            className="flex items-center text-palletGray-200 py-2 px-6 rounded-full cursor-pointer mt-3 hover:text-palletPurple-500 hover:bg-palletPurple-200 duration-500"
          >
            <FaChartLine className="" size={20} />
            <span className=" pl-3">History</span>
          </Link>
          <Link
            href={"/dashboard/settings"}
            className="flex items-center text-palletGray-200 py-2 px-6 rounded-full cursor-pointer mt-3 hover:text-palletPurple-500 hover:bg-palletPurple-200 duration-500"
          >
            <IoSettings size={20} />
            <span className=" pl-3">Settings</span>
          </Link>
          <Link
            href={"/"}
            className="flex items-center text-palletGray-200 py-2 px-6 rounded-full cursor-pointer mt-3 hover:text-palletPurple-500 hover:bg-palletPurple-200 transition-colors duration-500"
          >
            <FiLogOut className="" size={20} />
            <span className=" pl-3">Logout</span>
          </Link>
        </ul>
      </div>
      <div className="flex md:hidden flex-col  ">
        <div className="flex justify-around items-center  pb-4">
          <Link href={"/dashboard"}>
            <img
              src="/images/logo.svg"
              alt=""
              width={180}
              className="mt-8 bg-white  rounded-lg p-3"
            />
          </Link>
          <HiMenuAlt3
            size={32}
            className="mt-8"
            color={darkMode ? "#fff" : ""}
            onClick={() => setMobileMenu(!mobileMenu)}
          />
        </div>
        {mobileMenu ? (
          <ul className="mt-5 my-8 mx-4">
            <Link
              href={"/dashboard"}
              className="flex items-center text-palletGray-200 py-2 px-6 rounded-full cursor-pointer hover:text-palletPurple-500 hover:bg-palletPurple-200 duration-500"
            >
              <BiSolidDashboard size={20} />
              <span className=" pl-3">Dashboard</span>
            </Link>
            <Link
              href={"/dashboard/workouts"}
              className="flex items-center text-palletGray-200 py-2 px-6 rounded-full cursor-pointer mt-3 hover:text-palletPurple-500 hover:bg-palletPurple-200 duration-500"
            >
              <FiActivity className="" size={20} />
              <span className=" pl-3">Workouts</span>
            </Link>
            <Link
              href={"/dashboard/settings"}
              className="flex items-center text-palletGray-200 py-2 px-6 rounded-full cursor-pointer mt-3 hover:text-palletPurple-500 hover:bg-palletPurple-200 duration-500"
            >
              <IoSettings size={20} />
              <span className=" pl-3">Settings</span>
            </Link>
            <Link
              href={"/"}
              className="flex items-center text-palletGray-200 py-2 px-6 rounded-full cursor-pointer mt-3 hover:text-palletPurple-500 hover:bg-palletPurple-200 transition-colors duration-500"
            >
              <FiLogOut className="" size={20} />
              <span className=" pl-3">Logout</span>
            </Link>
          </ul>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
export default SidebarComponent;
