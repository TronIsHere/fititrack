// path/filename: /components/SidebarComponent.tsx

import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { BiSolidDashboard } from "react-icons/bi";
import { FaChartLine } from "react-icons/fa6";
import { FiActivity, FiLogOut } from "react-icons/fi";
import { IoSettings } from "react-icons/io5";
import DesktopSidebar from "./desktop-sidebar";
import MobileSidebar from "./mobile-sidebar";
import NavLink from "../ui/navbar/navlink";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

interface SidebarProps {
  darkMode: boolean;
}

const SidebarComponent: NextPage<SidebarProps> = ({ darkMode }) => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const router = useRouter();
  const path = usePathname();
  const closeMobileMenu = useCallback(() => {
    setMobileMenu(false);
  }, []);
  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.replace("/");
  };
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
  const renderLinks = useCallback(
    () =>
      links.map((link, index) => (
        <NavLink
          key={index}
          href={link.href}
          icon={link.icon}
          label={link.label}
          isActive={router.pathname === link.href}
          onClick={link.label === "Logout" ? handleLogout : closeMobileMenu}
        />
      )),
    [router.pathname]
  );
  return (
    <>
      <DesktopSidebar darkModeState={darkMode} renderLinks={renderLinks} />
      <MobileSidebar
        darkMode={darkMode}
        mobileMenu={mobileMenu}
        setMobileMenu={setMobileMenu}
        renderLinks={renderLinks}
      />
    </>
  );
};

export default SidebarComponent;
