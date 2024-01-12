// path/filename: /components/SidebarComponent.tsx

import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { BiSolidDashboard } from "react-icons/bi";
import { FaChartLine } from "react-icons/fa6";
import { FiActivity, FiLogOut } from "react-icons/fi";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoSettings } from "react-icons/io5";
import NavLink from "./navbar/navlink";

interface SidebarProps {
  darkMode: boolean;
}

const SidebarComponent: NextPage<SidebarProps> = ({ darkMode }) => {
  const [mobileMenu, setMobileMenu] = useState(false);

  const links = [
    {
      href: "/dashboard",
      icon: <BiSolidDashboard size={20} />,
      label: "Dashboard",
    },
    {
      href: "/dashboard/workouts",
      icon: <FiActivity size={20} />,
      label: "Workouts",
    },
    {
      href: "/dashboard/history",
      icon: <FaChartLine size={20} />,
      label: "History",
    },
    {
      href: "/dashboard/settings",
      icon: <IoSettings size={20} />,
      label: "Settings",
    },
    { href: "/", icon: <FiLogOut size={20} />, label: "Logout" },
  ];

  return (
    <>
      <div className="hidden md:flex flex-col">
        <Link href={"/dashboard"} className="self-center">
          <img
            src="/images/logo.svg"
            alt=""
            width={180}
            className="mt-8 bg-white p-3 rounded-xl"
          />
        </Link>
        <ul className="mt-14 m-8">
          {links.map((link, index) => (
            <NavLink
              key={index}
              href={link.href}
              icon={link.icon}
              label={link.label}
            />
          ))}
        </ul>
      </div>
      <div className="flex md:hidden flex-col">
        <div className="flex justify-around items-center pb-4">
          <Link href={"/dashboard"}>
            <img
              src="/images/logo.svg"
              alt=""
              width={180}
              className="mt-8 bg-white rounded-lg p-3"
            />
          </Link>
          <HiMenuAlt3
            size={32}
            className="mt-8"
            color={darkMode ? "#fff" : ""}
            onClick={() => setMobileMenu(!mobileMenu)}
          />
        </div>
        {mobileMenu && (
          <ul className="mt-5 my-8 mx-4">
            {links.map((link, index) => (
              <NavLink
                key={index}
                href={link.href}
                icon={link.icon}
                label={link.label}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default SidebarComponent;
