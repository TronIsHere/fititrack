import { cn } from "@/lib/utils";
import { RootState } from "@/store/store";
import { NextPage } from "next";
import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SidebarComponent from "../sidebar/sidebar";
import UnskippablePopup from "@/components/ui/dialogs/payDialog";
import { parseISO, differenceInDays } from "date-fns";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

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

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Check if there's no session and if the session is not loading
    if (status !== "loading" && !session) {
      router.push("/login");
    }
  }, [session, status]);

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

  // Prevent rendering of the layout until session status is known
  if (status === "loading" || !session) {
    return null; // Alternatively, you could render a loading spinner here
  }

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
        <div className="flex-[8] p-4 px-6 min-h-[300px] custom-background dark:bg-darkSecondary dark:text-white">
          {children}
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
