import { cn } from "@/lib/utils";
import { RootState } from "@/store/store";
import { NextPage } from "next";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import SidebarComponent from "../sidebar/sidebar";
import { useEffect, useState } from "react";
import { parseISO, differenceInDays } from "date-fns";
import UnskippablePopup from "@/components/ui/dialogs/payDialog";

interface LayoutProps {
  children: ReactNode;
  excludePopup?: boolean;
}

const DashboardLayout: NextPage<LayoutProps> = ({
  children,
  excludePopup = false,
}) => {
  const darkModeState = useSelector((state: RootState) => state.user.darkMode);
  const { trial, paid } = useSelector((state: RootState) => state.user);
  const [showUnskippablePopup, setShowUnskippablePopup] = useState(false);

  useEffect(() => {
    if (trial && !paid && !excludePopup) {
      const trialEndDate = parseISO(trial);
      const currentDate = new Date();
      const daysLeft = differenceInDays(trialEndDate, currentDate);

      // Check if trial has ended and user hasn't paid
      if (daysLeft <= 0) {
        setShowUnskippablePopup(true);
      } else {
        setShowUnskippablePopup(false);
      }
    } else {
      setShowUnskippablePopup(false);
    }
  }, [trial, paid, excludePopup]);

  return (
    <>
      {showUnskippablePopup && <UnskippablePopup darkMode={darkModeState} />}
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
    </>
  );
};

export default DashboardLayout;
