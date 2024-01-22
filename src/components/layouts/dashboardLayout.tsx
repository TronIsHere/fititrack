import { cn } from "@/lib/utils";
import { RootState } from "@/store/store";
import { NextPage } from "next";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import SidebarComponent from "../sidebar/sidebar";

interface LayoutProps {
  children: ReactNode;
}

const DashboardLayout: NextPage<LayoutProps> = ({ children }) => {
  const darkModeState = useSelector((state: RootState) => state.user.darkMode);

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row min-h-screen",
        darkModeState ? "dark" : ""
      )}
    >
      <aside className="flex-[2] dark:bg-darkPrimary">
        <SidebarComponent darkMode={darkModeState} />
      </aside>
      <div className="flex-[8] p-4 px-6  min-h-[300px] custom-background dark:bg-darkSecondary dark:text-white">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
