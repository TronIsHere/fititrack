import { cn } from "@/lib/utils";
import { RootState } from "@/store/store";
import { NextPage } from "next";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import SidebarComponent from "../sidebar/sidebar";

interface LayoutProps {
  children: ReactNode;
}

const AuthLayout: NextPage<LayoutProps> = ({ children }) => {
  const darkModeState = useSelector((state: RootState) => state.user.darkMode);

  return (
    <div className={darkModeState ? "dark" : ""}>
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen max-h-full dark:text-white dark:bg-darkPrimary">
        <div className="flex items-center justify-center flex-col ">
          {children}
        </div>
        <div className="bg-palletGray-100 flex items-center">
          <div className="relative overflow-hidden">
            <img
              src="/images/waitlist.png"
              alt="background-image for right side of the panel"
              className="ml-40"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
